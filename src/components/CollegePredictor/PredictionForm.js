'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { PAGE_SIZES } from '@/constants';
import { CATEGORIES, STATES } from '@/constants/josaa';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import {
  predictionRequest,
  predictorSelections,
  quotaOptions,
  readPredictionForm,
  seatPoolOptions,
} from '@/utils/predictorSelections.mjs';
import { quotaLabel } from '@/utils/quotaLabel.mjs';
import styles from './Workspace.module.css';

export function PredictionForm({ defaultValues, getPredictionData, onSuccess, onClose }) {
  const viewed = useRef(false);
  const form = useRef(null);
  const edited = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const selections = predictorSelections(defaultValues);
  useEffect(() => {
    if (!defaultValues || edited.current) return;
    const values = { ...defaultValues, ...predictorSelections(defaultValues) };
    for (const field of form.current.elements) {
      const value = values[field.name];
      if (value == null) continue;
      if (field.type === 'checkbox') field.checked = value.includes(field.value);
      else field.value = String(value);
    }
  }, [defaultValues]);
  useEffect(() => {
    if (!viewed.current) {
      sendAnalyticsEvent({
        action: 'form_viewed',
        category: 'college_predictor',
        label: 'Predictor form shown',
        value: 1,
      });
      viewed.current = true;
    }
  }, []);
  function selectQuotas(checked) {
    edited.current = true;
    for (const field of form.current.elements.namedItem('quotas')) field.checked = checked;
  }
  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    const data = readPredictionForm(new FormData(event.currentTarget));
    for (const [name, label] of [
      ['seatPools', 'seat pool'],
      ['quotas', 'quota'],
    ]) {
      if (!data[name].length) {
        setError(`Select at least one ${label}.`);
        form.current.elements.namedItem(name)[0].focus();
        return;
      }
    }
    setPending(true);
    setError('');
    sendAnalyticsEvent({
      action: 'form_submitted',
      category: 'college_predictor',
      label: 'College predictor form submit',
      value: 1,
    });
    try {
      const results = await getPredictionData(predictionRequest(data)).unwrap();
      sendAnalyticsEvent({
        action: 'prediction_completed',
        category: 'college_predictor',
        label: 'Prediction results returned',
        value: 1,
        parameters: {
          outcome: results?.length ? 'results' : 'empty',
          result_count: results?.length ?? 0,
        },
      });
      onSuccess(data);
      onClose(true);
    } catch {
      setError(
        'We could not retrieve your results. Your entries are still here; please try again.',
      );
      sendAnalyticsEvent({
        action: 'prediction_failed',
        category: 'college_predictor',
        label: 'Prediction request failed',
        parameters: { outcome: 'error' },
      });
      setPending(false);
    }
  }
  return (
    <section className={styles.formPanel} aria-labelledby="rank-form-title">
      <div className={styles.formHeading}>
        <div>
          <p className="eyebrow">Your rank context</p>
          <h2 id="rank-form-title">
            Both exams. <em>Each in context.</em>
          </h2>
        </div>
        <p>
          Use the rank list matching your selected category. OPEN uses CRL; reserved seats use the
          corresponding category rank.
        </p>
      </div>
      <form
        ref={form}
        onChange={() => {
          edited.current = true;
        }}
        onSubmit={submit}
      >
        <fieldset className={styles.formSection}>
          <legend>
            <span>01</span> Rank context
          </legend>
          <div className={styles.formGrid}>
            <label className={`field ${styles.fullField}`}>
              Category / rank list
              <select name="category" required defaultValue={defaultValues?.category ?? ''}>
                <option value="" disabled>
                  Select category
                </option>
                {Object.values(CATEGORIES).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              JEE Main rank
              <input
                name="mainsRank"
                type="number"
                min="1"
                step="1"
                required
                defaultValue={defaultValues?.mainsRank ?? ''}
                placeholder="Enter your rank"
              />
              <small>Required · matching rank list, not percentile</small>
            </label>
            <label className="field">
              JEE Advanced rank
              <input
                name="advRank"
                type="number"
                min="1"
                step="1"
                defaultValue={defaultValues?.advRank ?? ''}
                placeholder="Optional"
              />
              <small>Optional · participating IIT and IISc programmes</small>
            </label>
          </div>
        </fieldset>
        <fieldset className={styles.formSection}>
          <legend>
            <span>02</span> Allocation context
          </legend>
          <div className={styles.formGrid}>
            <label className={`field ${styles.fullField}`}>
              State for quota lookup
              <select name="state" required defaultValue={defaultValues?.state ?? ''}>
                <option value="" disabled>
                  Select home state
                </option>
                {STATES.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <fieldset
              className={`${styles.allocationChoices} ${styles.fullField}`}
              aria-describedby="seat-pool-help"
            >
              <legend>Seat pools</legend>
              <div className={styles.selectionGrid}>
                {seatPoolOptions.map((value) => (
                  <label key={value} className={styles.selectionOption}>
                    <input
                      type="checkbox"
                      name="seatPools"
                      value={value}
                      defaultChecked={selections.seatPools.includes(value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
              <p id="seat-pool-help">
                Select one or both. Female-only eligibility follows JoSAA rules.
              </p>
            </fieldset>
            <fieldset
              className={`${styles.allocationChoices} ${styles.fullField}`}
              aria-describedby="quota-help"
            >
              <legend>Quotas</legend>
              <div className={styles.selectionActions}>
                <button type="button" onClick={() => selectQuotas(true)}>
                  Select all quotas
                </button>
                <button type="button" onClick={() => selectQuotas(false)}>
                  Clear quotas
                </button>
              </div>
              <div className={styles.selectionGrid}>
                {quotaOptions.map((value) => (
                  <label key={value} className={styles.selectionOption}>
                    <input
                      type="checkbox"
                      name="quotas"
                      value={value}
                      defaultChecked={selections.quotas.includes(value)}
                    />
                    <span>{quotaLabel(value)}</span>
                  </label>
                ))}
              </div>
              <p id="quota-help">
                Selections use the state lookup above. Special quotas retain their published codes;
                check the institute’s rules.
              </p>
            </fieldset>
          </div>
        </fieldset>
        <details data-accordion className={styles.searchSettings}>
          <summary>
            <span>
              Search settings <small>Historical window &amp; result count</small>
            </span>
            <Icon name="chevronDown" className="disclosure-chevron" />
          </summary>
          <div
            className={styles.formGrid}
            onInvalid={(event) => {
              event.currentTarget.closest('details').open = true;
            }}
          >
            <label className="field">
              Historical search window (%)
              <input
                name="delta"
                type="number"
                required
                step="1"
                defaultValue={defaultValues?.delta ?? 10}
              />
              <small>Cutoff delta used by the comparison method</small>
            </label>
            <label className="field">
              Maximum allocation rows
              <select name="count" defaultValue={defaultValues?.count ?? PAGE_SIZES[0]}>
                {PAGE_SIZES.map((value) => (
                  <option key={value} value={value}>
                    {value} rows
                  </option>
                ))}
              </select>
              <small>Several rows may belong to one programme</small>
            </label>
          </div>
        </details>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <div className={styles.formActions}>
          <p>
            Historical comparisons only. Verify programme eligibility and current rules on JoSAA.
          </p>
          <button type="button" className="button" disabled={pending} onClick={() => onClose()}>
            Cancel
          </button>
          <button type="submit" className="button primary" disabled={pending}>
            {pending ? 'Finding comparisons…' : 'Find my options'} <Icon name="arrowUpRight" />
          </button>
        </div>
      </form>
    </section>
  );
}
