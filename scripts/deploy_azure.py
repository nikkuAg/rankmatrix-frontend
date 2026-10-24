"""Stage an immutable image, verify it, promote it, and verify traffic rollback.

No credentials or application configuration are persisted. State contains only
the previous revision, hostname and public release identifier.
"""
import json
import os
from pathlib import Path
import signal
import subprocess
import time
import urllib.request
import urllib.error


class Deployment:
    def __init__(self, env=os.environ):
        self.env = dict(env)
        self.app = env['CONTAINER_APP']
        self.group = env['RESOURCE_GROUP']
        self.sha = env['GITHUB_SHA']
        self.suffix = 'r{}-{}'.format(env['GITHUB_RUN_ID'], env['GITHUB_RUN_ATTEMPT'])
        self.candidate = self.app + '--' + self.suffix
        self.state = Path(env.get('DEPLOY_STATE', '.deploy-state.json'))

    def az(self, *args):
        result = subprocess.run(
            ['az', 'containerapp', *args, '-n', self.app, '-g', self.group,
             '--only-show-errors', '-o', 'json'],
            check=True, capture_output=True, text=True, timeout=90)
        return json.loads(result.stdout) if result.stdout.strip() else None

    def health(self, base, expected=None):
        path = '/api/health/ready' if self.env['APP_KIND'] == 'backend' else '/health'
        with urllib.request.urlopen(base + path, timeout=8) as response:
            data = json.load(response)
        if data.get('status') != 'ok' or (expected and data.get('release') != expected):
            raise RuntimeError('Health/release check failed for ' + base)
        return data.get('release')

    def wait_health(self, base, expected):
        for attempt in range(12):
            try:
                return self.health(base, expected)
            except Exception:
                if attempt == 11:
                    raise
                time.sleep(5)

    def smoke(self, base):
        command = (['python3', 'scripts/smoke_azure.py'] if self.env['APP_KIND'] == 'backend'
                   else ['node', 'scripts/smoke-azure.mjs'])
        subprocess.run(command, check=True, timeout=180,
                       env={**os.environ, 'SMOKE_BASE_URL': base})

    def baseline(self, base):
        # The first guarded release replaces images without the new endpoint.
        # A legacy baseline must still pass the existing application smoke test.
        try:
            return self.health(base)
        except urllib.error.HTTPError as error:
            if error.code != 404:
                raise
            self.smoke(base)
            return None

    def traffic(self, revision):
        self.az('ingress', 'traffic', 'set', '--revision-weight', revision + '=100')

    def rollback(self):
        saved = json.loads(self.state.read_text())
        print('Restoring traffic to ' + saved['revision'], flush=True)
        for attempt in range(3):
            try:
                previous = self.az('revision', 'show', '--revision', saved['revision'])
                if not previous['properties']['active']:
                    self.az('revision', 'activate', '--revision', saved['revision'])
                self.traffic(saved['revision'])
                break
            except Exception:
                if attempt == 2:
                    raise
                time.sleep(10)
        if saved['release']:
            self.wait_health(saved['base'], saved['release'])
        self.smoke(saved['base'])
        # Do not deactivate the candidate unless recovery has been verified.
        revisions = self.az('revision', 'list')
        if any(revision['name'] == self.candidate for revision in revisions):
            self.az('revision', 'deactivate', '--revision', self.candidate)
        print('Rollback verified; deployment remains failed.', flush=True)

    def deploy(self):
        app = self.az('show')
        ingress = app['properties']['configuration']['ingress']
        previous = app['properties']['latestReadyRevisionName']
        weights = ingress.get('traffic', [])
        if len(weights) != 1 or weights[0].get('weight') != 100:
            raise RuntimeError('Expected one production revision at 100%; refusing to replace split traffic')
        previous = weights[0].get('revisionName') or previous
        base = 'https://' + ingress['fqdn']
        print('Release {}: {} -> {}'.format(self.sha, previous, self.candidate), flush=True)
        release = self.baseline(base)
        self.state.write_text(json.dumps(dict(revision=previous, base=base, release=release)))
        # Pin the healthy revision BEFORE creating the candidate. Otherwise an
        # existing latestRevision traffic rule can publish an untested image.
        self.az('revision', 'set-mode', '--mode', 'multiple')
        self.traffic(previous)
        try:
            image = '{ACR_NAME}.azurecr.io/{IMAGE_NAME}:{GITHUB_SHA}'.format(**self.env)
            self.az('update', '--image', image, '--revision-suffix', self.suffix,
                    '--set-env-vars', 'RELEASE_SHA=' + self.sha)
            candidate = self.az('revision', 'show', '--revision', self.candidate)
            candidate_base = 'https://' + candidate['properties']['fqdn']
            self.wait_health(candidate_base, self.sha)
            self.smoke(candidate_base)
            self.traffic(self.candidate)
            self.wait_health(base, self.sha)
            self.smoke(base)
            public = self.env['PUBLIC_BASE_URL']
            self.wait_health(public, self.sha)
            self.smoke(public)
        except BaseException:
            # SIGTERM from ordinary cancellation also reaches this recovery.
            # A separate always() workflow step retries if this process dies.
            self.rollback()
            raise
        print('Candidate and public production checks passed.', flush=True)
        # Inactive revisions retain the rollback image without running replicas.
        try:
            self.az('revision', 'deactivate', '--revision', previous)
        except Exception:
            print('WARNING: previous revision cleanup failed; production checks passed.', flush=True)


def main():
    def interrupted(signum, frame):
        raise RuntimeError('Deployment interrupted; restoring the previous revision')
    signal.signal(signal.SIGTERM, interrupted)
    deployment = Deployment()
    if os.environ.get('ROLLBACK_ONLY') == 'true':
        deployment.rollback()
    else:
        deployment.deploy()


if __name__ == '__main__':
    main()
