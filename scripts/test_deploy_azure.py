"""Failure injection against a stateful Azure/HTTP substitute, never production."""
import json
import io
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import urllib.error
from deploy_azure import Deployment


class FakeDeployment(Deployment):
    def __init__(self, directory, fail=None):
        super().__init__(dict(CONTAINER_APP='app', RESOURCE_GROUP='rg', GITHUB_SHA='new',
                             GITHUB_RUN_ID='1', GITHUB_RUN_ATTEMPT='1', ACR_NAME='acr',
                             IMAGE_NAME='image', APP_KIND='backend', PUBLIC_BASE_URL='https://public',
                             DEPLOY_STATE=str(Path(directory) / 'state.json')))
        self.fail = fail
        self.current = 'old'
        self.revisions = ['old']
        self.checked = []
        self.actions = []

    def az(self, *args):
        self.actions.append(args)
        if args == ('show',):
            return {'properties': {'latestReadyRevisionName': 'old', 'configuration': {
                'ingress': {'fqdn': 'stable', 'traffic': [{'revisionName': 'old', 'weight': 100}]}}}}
        if args[0] == 'update':
            self.assert_traffic('old')
            if self.fail == 'update':
                raise RuntimeError('update failed before revision creation')
            self.revisions.append(self.candidate)
        if args[:2] == ('revision', 'show'):
            return {'properties': {'fqdn': 'candidate', 'active': True}}
        if args[:3] == ('ingress', 'traffic', 'set'):
            revision = args[-1].split('=')[0]
            if revision == self.candidate and self.fail == 'promote':
                # Azure may apply a request before returning an error.
                self.current = revision
                raise RuntimeError('promotion failed after application')
            self.current = revision
        if args[:2] == ('revision', 'list'):
            return [{'name': revision} for revision in self.revisions]

    def assert_traffic(self, expected):
        if self.current != expected:
            raise AssertionError('Untested revision received production traffic')

    def health(self, base, expected=None):
        actual = 'new' if base == 'https://candidate' or self.current == self.candidate else 'old'
        if expected and actual != expected:
            raise RuntimeError('wrong release')
        return actual

    def wait_health(self, base, expected):
        if self.fail == 'candidate-health' and base == 'https://candidate':
            raise RuntimeError('candidate unhealthy')
        if self.fail == 'rollback-health' and expected == 'old':
            raise RuntimeError('recovery unavailable')
        return self.health(base, expected)

    def smoke(self, base):
        self.checked.append((base, self.current))
        if base == 'https://candidate':
            self.assert_traffic('old')
        if self.fail == 'candidate-smoke' and base == 'https://candidate':
            raise RuntimeError('bad API/content')
        if self.fail in ('public', 'rollback-health') and base == 'https://public':
            raise RuntimeError('public domain failed')
        if self.fail == 'cancel' and base == 'https://candidate':
            raise KeyboardInterrupt()


class DeploymentTests(unittest.TestCase):
    def test_real_health_check_rejects_old_release_and_unhealthy_payload(self):
        with tempfile.TemporaryDirectory() as directory:
            deploy = FakeDeployment(directory)
            for payload in [{'status': 'ok', 'release': 'old'},
                            {'status': 'unavailable', 'release': 'new'}]:
                with patch('deploy_azure.urllib.request.urlopen', return_value=io.BytesIO(json.dumps(payload).encode())):
                    with self.assertRaises(RuntimeError):
                        Deployment.health(deploy, 'https://candidate', 'new')
            with patch('deploy_azure.urllib.request.urlopen', return_value=io.BytesIO(b'{"status":"ok","release":"new"}')):
                self.assertEqual(Deployment.health(deploy, 'https://candidate', 'new'), 'new')

    def test_only_missing_legacy_health_endpoint_can_use_smoke_fallback(self):
        with tempfile.TemporaryDirectory() as directory:
            deploy = FakeDeployment(directory)
            for status in [404, 503]:
                error = urllib.error.HTTPError('https://stable', status, 'error', {}, None)
                with patch.object(deploy, 'health', side_effect=error):
                    if status == 404:
                        self.assertIsNone(deploy.baseline('https://stable'))
                    else:
                        with self.assertRaises(urllib.error.HTTPError):
                            deploy.baseline('https://stable')

    def test_split_traffic_is_refused_without_changing_azure(self):
        with tempfile.TemporaryDirectory() as directory:
            deploy = FakeDeployment(directory)
            app = deploy.az('show')
            app['properties']['configuration']['ingress']['traffic'][0]['weight'] = 50
            with patch.object(deploy, 'az', return_value=app) as azure:
                with self.assertRaisesRegex(RuntimeError, 'split traffic'):
                    deploy.deploy()
                self.assertEqual(azure.call_count, 1)

    def test_candidate_is_verified_before_traffic_and_public_after(self):
        with tempfile.TemporaryDirectory() as directory:
            deploy = FakeDeployment(directory)
            deploy.deploy()
            self.assertEqual(deploy.current, deploy.candidate)
            self.assertEqual(deploy.checked, [('https://candidate', 'old'),
                                             ('https://stable', deploy.candidate),
                                             ('https://public', deploy.candidate)])
            self.assertIn(('revision', 'deactivate', '--revision', 'old'), deploy.actions)

    def test_failed_staging_promotion_public_checks_and_cancellation_restore_old(self):
        for failure in ['update', 'candidate-health', 'candidate-smoke', 'promote', 'public', 'cancel']:
            with self.subTest(failure=failure), tempfile.TemporaryDirectory() as directory:
                deploy = FakeDeployment(directory, failure)
                with self.assertRaises((RuntimeError, KeyboardInterrupt)):
                    deploy.deploy()
                self.assertEqual(deploy.current, 'old')
                self.assertIn(('https://stable', 'old'), deploy.checked)

    def test_failed_recovery_does_not_remove_candidate_or_claim_success(self):
        with tempfile.TemporaryDirectory() as directory:
            deploy = FakeDeployment(directory, 'rollback-health')
            with self.assertRaisesRegex(RuntimeError, 'recovery unavailable'):
                deploy.deploy()
            self.assertNotIn(('revision', 'deactivate', '--revision', deploy.candidate), deploy.actions)

    def test_fallback_recovery_can_use_saved_state(self):
        with tempfile.TemporaryDirectory() as directory:
            deploy = FakeDeployment(directory)
            deploy.deploy()
            deploy.rollback()
            self.assertEqual(deploy.current, 'old')
            self.assertEqual(json.loads(deploy.state.read_text())['revision'], 'old')


if __name__ == '__main__':
    unittest.main()
