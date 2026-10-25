'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { MultiSelect } from '@/components/MultiSelect';
import { PAGE_SIZES } from '@/constants';
import { STATES } from '@/constants/josaa';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import {
  categoryLabel,
  categoryOptions,
  predictionFormData,
  predictionRequest,
  predictorFormValues,
  quotaOptions,
  seatPoolOptions,
} from '@/utils/predictorSelections.mjs';
import { quotaLabel } from '@/utils/quotaLabel.mjs';
import styles from './Workspace.module.css';

const categories = categoryOptions.map((value) => ({ value, label: categoryLabel(value) }));
const pools = seatPoolOptions.map((value) => ({ value, label: value }));
const quotas = quotaOptions.map((value) => ({ value, label: quotaLabel(value) }));

export function PredictionForm({ defaultValues, getPredictionData, onSuccess, onClose }) {
  const viewed = useRef(false);
  const form = useRef(null);
  const edited = useRef(false);
  const [values, setValues] = useState(() => predictorFormValues(defaultValues));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState('');
  useEffect(() => {
    if (!defaultValues || edited.current) return;
    setValues(predictorFormValues(defaultValues));
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
  function update(name, value) {
    edited.current = true;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (invalid === name) {
      setInvalid('');
      setError('');
    }
  }
  function updateRank(category, exam, value) {
    edited.current = true;
    setValues((previous) => ({
      ...previous,
      ranks: {
        ...previous.ranks,
        [category]: { ...previous.ranks[category], [exam]: value },
      },
    }));
  }
  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    for (const [name, label] of [
      ['categories', 'category'],
      ['seatPools', 'seat pool'],
      ['quotas', 'quota'],
    ]) {
      if (!values[name].length) {
        setInvalid(name);
        setError(`Select at least one ${label}.`);
        form.current.querySelector(`[data-selection="${name}"]`).focus();
        return;
      }
    }
    const data = predictionFormData(values);
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
          Select the categories you want to explore. Enter each category’s own rank: CRL for OPEN,
          the corresponding category rank for reserved seats.
        </p>
      </div>
      <form ref={form} onSubmit={submit}>
        <fieldset className={styles.formSection}>
          <legend>
            <span>01</span> Rank context
          </legend>
          <MultiSelect
            name="categories"
            label="Categories / rank lists"
            options={categories}
            value={values.categories}
            onChange={(value) => update('categories', value)}
            placeholder="Select categories"
            invalid={invalid === 'categories'}
            errorId="predictor-form-error"
            help="Choose only categories relevant to your rank lists. A selection does not establish eligibility."
          />
          {values.categories.map((category) => (
            <fieldset key={category} className={styles.rankProfile}>
              <legend>{categoryLabel(category)}</legend>
              <div className={styles.formGrid}>
                <label className="field">
                  JEE Main rank
                  <input
                    name={`mainsRank:${category}`}
                    aria-label={`JEE Main rank — ${category}`}
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={values.ranks[category]?.mainsRank ?? ''}
                    onChange={(event) => updateRank(category, 'mainsRank', event.target.value)}
                    placeholder={category === 'General' ? 'Enter CRL' : 'Enter category rank'}
                  />
                  <small>
                    Required · {category === 'General' ? 'CRL' : `${category} rank list`}, not
                    percentile
                  </small>
                </label>
                <label className="field">
                  JEE Advanced rank
                  <input
                    name={`advRank:${category}`}
                    aria-label={`JEE Advanced rank — ${category}`}
                    type="number"
                    min="1"
                    step="1"
                    value={values.ranks[category]?.advRank ?? ''}
                    onChange={(event) => updateRank(category, 'advRank', event.target.value)}
                    placeholder="Optional"
                  />
                  <small>
                    Optional · {category === 'General' ? 'CRL' : `${category} rank list`}
                  </small>
                </label>
              </div>
            </fieldset>
          ))}
        </fieldset>
        <fieldset className={styles.formSection}>
          <legend>
            <span>02</span> Allocation context
          </legend>
          <div className={styles.formGrid}>
            <label className={`field ${styles.fullField}`}>
              State for quota lookup
              <select
                name="state"
                required
                value={values.state}
                onChange={(event) => update('state', event.target.value)}
              >
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
            <MultiSelect
              name="seatPools"
              label="Seat pools"
              options={pools}
              value={values.seatPools}
              onChange={(value) => update('seatPools', value)}
              allLabel="Both seat pools"
              invalid={invalid === 'seatPools'}
              errorId="predictor-form-error"
              help="Female-only eligibility follows JoSAA rules."
            />
            <MultiSelect
              name="quotas"
              label="Quotas"
              options={quotas}
              value={values.quotas}
              onChange={(value) => update('quotas', value)}
              allLabel="All applicable quotas"
              invalid={invalid === 'quotas'}
              errorId="predictor-form-error"
              help="Uses your state. Special quotas keep published codes; check institute rules."
            />
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
                value={values.delta}
                onChange={(event) => update('delta', event.target.value)}
              />
              <small>Cutoff delta used by the comparison method</small>
            </label>
            <label className="field">
              Maximum allocation rows
              <select
                name="count"
                value={values.count}
                onChange={(event) => update('count', event.target.value)}
              >
                {PAGE_SIZES.map((value) => (
                  <option key={value} value={value}>
                    {value} rows
                  </option>
                ))}
              </select>
              <small>
                Shared across selected rank lists; several rows may belong to one programme.
              </small>
            </label>
          </div>
        </details>
        {error && (
          <p id="predictor-form-error" className={styles.error} role="alert">
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
