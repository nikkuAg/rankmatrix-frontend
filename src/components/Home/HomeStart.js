'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import { CHOICES_KEY, parseChoices } from '@/utils/choices.mjs';
import { loadPredictorFormData, savePredictorFormData } from '@/utils/formStorage';
import { generalRanks, withGeneralRanks } from '@/utils/predictorSelections.mjs';
import styles from './Home.module.css';

// The rank entry on the home page. It hands the ranks to the predictor through the same browser
// storage the predictor form already uses, so no rank ever appears in a URL.
export function HomeStart() {
  const router = useRouter();
  const [ranks, setRanks] = useState({ mainsRank: '', advRank: '' });
  const [savedChoices, setSavedChoices] = useState(0);
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reconcile browser storage after hydration */
    setRanks(generalRanks(loadPredictorFormData()));
    try {
      setSavedChoices(parseChoices(window.localStorage.getItem(CHOICES_KEY)).length);
    } catch {
      // Storage is blocked; the form still works for this visit.
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  function submit(event) {
    event.preventDefault();
    savePredictorFormData(
      withGeneralRanks(loadPredictorFormData(), ranks.mainsRank, ranks.advRank),
    );
    sendAnalyticsEvent({
      action: 'home_rank_entered',
      category: 'home',
      label: 'Home rank entry submitted',
      value: 1,
      parameters: { outcome: ranks.advRank ? 'main_and_advanced' : 'main_only' },
    });
    router.push('/predict');
  }
  const field = (name, exam) => ({
    name,
    type: 'text',
    inputMode: 'numeric',
    pattern: '[1-9][0-9]*',
    autoComplete: 'off',
    'aria-describedby': `home-${name}-hint`,
    value: ranks[name],
    onChange: (event) => {
      event.target.setCustomValidity('');
      setRanks((previous) => ({ ...previous, [name]: event.target.value }));
    },
    // Say what to type instead of the browser's generic "match the requested format".
    onInvalid: (event) =>
      event.target.setCustomValidity(
        event.target.validity.valueMissing
          ? `Enter your ${exam} rank.`
          : `Enter your ${exam} rank as a whole number, such as 18000. A percentile will not work.`,
      ),
  });
  return (
    <div className={styles.start}>
      <form onSubmit={submit} aria-labelledby="home-start-title">
        <h2 id="home-start-title">Enter your rank</h2>
        <div className={styles.startFields}>
          <label className="field">
            JEE Main rank
            <input {...field('mainsRank', 'JEE Main')} required />
            <small id="home-mainsRank-hint">Your overall rank (CRL), not percentile</small>
          </label>
          <label className="field">
            JEE Advanced rank
            <input {...field('advRank', 'JEE Advanced')} />
            <small id="home-advRank-hint">Optional. Needed for IITs</small>
          </label>
        </div>
        <button type="submit" className="button primary">
          Show my colleges <Icon name="arrowUpRight" />
        </button>
        <p className={styles.startNote}>
          Free. No signup, no phone number. You choose your category and home state next.
        </p>
      </form>
      {savedChoices > 0 && (
        <Link href="/predict" prefetch={false} className={styles.resume}>
          <span>
            You have {savedChoices} saved {savedChoices === 1 ? 'choice' : 'choices'}
          </span>
          <span>
            Continue with your list <Icon name="arrowRight" />
          </span>
        </Link>
      )}
    </div>
  );
}
