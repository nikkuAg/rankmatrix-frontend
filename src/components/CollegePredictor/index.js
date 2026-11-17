'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { useLazyGetpredictionDataQuery } from '@/store/queries/prediction';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import {
  choiceRows,
  CHOICES_KEY,
  examRankSummary,
  formatRank,
  groupProgrammes,
  parseChoices,
  programmeExam,
  programmesByExam,
} from '@/utils/choices.mjs';
import { downloadCSV } from '@/utils/downloadCSV';
import { loadPredictorFormData, savePredictorFormData } from '@/utils/formStorage';
import { instituteType } from '@/utils/instituteIdentity.mjs';
import {
  categoryLabel,
  quotaOptions,
  restorablePredictorData,
} from '@/utils/predictorSelections.mjs';
import { quotaLabel } from '@/utils/quotaLabel.mjs';
import { PredictionForm } from './PredictionForm';
import { ProgrammeEvidence } from './ProgrammeEvidence';
import styles from './Workspace.module.css';

const ChoiceWorkspace = dynamic(
  () => import('./ChoiceWorkspace').then((module) => module.ChoiceWorkspace),
  { loading: () => <p role="status">Opening your choices…</p> },
);

export function CollegePredictor() {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState(null);
  const [defaults, setDefaults] = useState(undefined);
  const [choices, setChoices] = useState([]);
  const [view, setView] = useState('results');
  const [selected, setSelected] = useState(null);
  const [mobilePane, setMobilePane] = useState('list');
  const [storageNotice, setStorageNotice] = useState('');
  const [restored, setRestored] = useState(false);
  const [pendingRestore, setPendingRestore] = useState(null);
  const loaded = useRef(false);
  const workspaceRoot = useRef(null);
  const formOpener = useRef(null);
  const resultsButton = useRef(null);
  const evidenceButton = useRef(null);
  const [getPredictionData, { data: rankData, isFetching }] = useLazyGetpredictionDataQuery();
  useEffect(() => {
    if (loaded.current) return;
    /* eslint-disable react-hooks/set-state-in-effect -- reconcile browser storage after hydration */
    const savedForm = loadPredictorFormData();
    setDefaults(savedForm);
    let savedChoices = [];
    try {
      savedChoices = parseChoices(window.localStorage.getItem(CHOICES_KEY));
      setChoices(savedChoices);
    } catch {
      setStorageNotice(
        'Browser storage is unavailable. Keep this tab open and export your list before leaving.',
      );
    }
    loaded.current = true;
    // A returning visitor gets their last results back, or their saved list, without retyping.
    const lastSearch = restorablePredictorData(savedForm);
    if (lastSearch) {
      setFormData(lastSearch);
      setOpen(false);
      setRestored(true);
      setPendingRestore(lastSearch);
    } else if (savedChoices.length) {
      setOpen(false);
      setView('choices');
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  // The search runs in its own effect, after mounting, so the results reach this component's
  // query subscription. A run that React cancels (development remounts) is ignored.
  useEffect(() => {
    if (!pendingRestore) return undefined;
    let cancelled = false;
    getPredictionData(pendingRestore, true)
      .unwrap()
      .then((results) => {
        if (cancelled) return;
        setPendingRestore(null);
        sendAnalyticsEvent({
          action: 'prediction_restored',
          category: 'college_predictor',
          label: 'Last prediction restored',
          value: 1,
          parameters: { result_count: results?.length ?? 0 },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setPendingRestore(null);
        setFormData(null);
        setRestored(false);
        setOpen(true);
      });
    return () => {
      cancelled = true;
    };
  }, [pendingRestore, getPredictionData]);
  function changeChoices(next) {
    setChoices(next);
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(CHOICES_KEY, JSON.stringify({ version: 1, choices: next }));
    } catch {
      setStorageNotice(
        'Your latest list could not be saved in this browser. Export it before leaving.',
      );
    }
  }
  function closeForm(completed = false) {
    setOpen(false);
    requestAnimationFrame(() => {
      const target = completed
        ? (resultsButton.current ?? formOpener.current)
        : (formOpener.current ?? resultsButton.current);
      target?.focus();
    });
    sendAnalyticsEvent({
      action: 'form_closed',
      category: 'college_predictor',
      label: 'College predictor form closed',
      value: 1,
    });
  }
  function openForm() {
    setOpen(true);
    requestAnimationFrame(() => {
      workspaceRoot.current
        ?.querySelector('input[name^="mainsRank"], [data-selection="categories"]')
        ?.focus();
    });
    sendAnalyticsEvent({
      action: `${formData ? 'update' : 'add'}_form_open_clicked`,
      category: 'college_predictor',
      label: 'College predictor form open',
      value: 1,
    });
  }
  function download() {
    const data =
      view === 'choices'
        ? choiceRows(choices)
        : (rankData || []).map((item) => ({
            institute: item.institute.name,
            instituteType: instituteType(item.institute),
            branch: item.branch.name,
            degree: item.branch.degree,
            duration: item.branch.courseDuration,
            exam: programmeExam(item.institute),
            year: 'Not supplied by predictor',
            round: item.round,
            quota: item.quota,
            category: item.category,
            seatPool: item.seatPool,
            openingRank: item.openingRank,
            closingRank: item.closingRank,
          }));
    downloadCSV(data, view === 'choices' ? 'rankmatrix_choices.csv' : 'rankmatrix_prediction.csv');
    sendAnalyticsEvent({
      action: 'csv_download',
      category: 'college_predictor',
      label: 'College predictor download CSV',
      value: 1,
    });
  }
  const programmes = groupProgrammes(rankData || []);
  const examGroups = programmesByExam(programmes);
  const evidence =
    programmes.find((programme) => programme.id === selected) || examGroups[0]?.programmes[0];
  const initialForm = open && !formData && !choices.length;
  return (
    <div ref={workspaceRoot} className={styles.root}>
      {!initialForm && (
        <div className={styles.topline}>
          <p className="eyebrow">JoSAA / Your planning desk</p>
          <div className={styles.topActions}>
            <button ref={formOpener} className="button" type="button" onClick={openForm}>
              {formData ? 'Edit ranks' : 'Enter ranks'}
            </button>
            <button
              className="button"
              type="button"
              disabled={view === 'choices' ? !choices.length : !rankData?.length}
              onClick={download}
            >
              Export {view === 'choices' ? 'choices' : 'results'} <Icon name="arrowDown" />
            </button>
          </div>
        </div>
      )}
      {formData && (
        <div className={styles.context}>
          <dl>
            {formData.rankProfiles.map((profile) => (
              <div key={profile.category}>
                <dt>{categoryLabel(profile.category)}</dt>
                <dd className={styles.profileSummary}>
                  <span>
                    <small>Main</small> {Number(profile.mainsRank).toLocaleString('en-IN')}
                  </span>
                  <span>
                    <small>Advanced</small>{' '}
                    {profile.advRank
                      ? Number(profile.advRank).toLocaleString('en-IN')
                      : 'Not entered'}
                  </span>
                </dd>
              </div>
            ))}
            <div>
              <dt>Seat pools</dt>
              <dd>{formData.seatPools.join(' · ')}</dd>
            </div>
            <div>
              <dt>Quotas</dt>
              <dd>
                {formData.quotas.length === quotaOptions.length
                  ? 'All applicable quotas'
                  : formData.quotas.map(quotaLabel).join(' · ')}
              </dd>
            </div>
            <div>
              <dt>State for quota lookup</dt>
              <dd>{formData.state}</dd>
            </div>
          </dl>
        </div>
      )}
      {open && (
        <PredictionForm
          defaultValues={formData ?? defaults}
          getPredictionData={getPredictionData}
          onClose={closeForm}
          onSuccess={(data) => {
            setFormData(data);
            setRestored(false);
            setPendingRestore(null);
            savePredictorFormData(data);
            setView('results');
            setSelected(null);
            setMobilePane('list');
          }}
        />
      )}
      {storageNotice && (
        <p role="status" className="notice">
          {storageNotice}
        </p>
      )}
      {!initialForm && (
        <div className={styles.tabs} role="group" aria-label="Workspace view">
          <button
            ref={resultsButton}
            type="button"
            aria-pressed={view === 'results'}
            onClick={() => setView('results')}
          >
            Predictor results <span>{programmes.length}</span>
          </button>
          <button
            type="button"
            aria-pressed={view === 'choices'}
            onClick={() => setView('choices')}
          >
            My choices <span>{choices.length}</span>
          </button>
        </div>
      )}
      {!initialForm &&
        (view === 'choices' ? (
          <ChoiceWorkspace choices={choices} onChange={changeChoices} />
        ) : (
          <>
            {formData && !isFetching && (
              <p className={styles.countline}>
                <strong>
                  {programmes.length} {programmes.length === 1 ? 'programme' : 'programmes'}
                  {examGroups.length > 1 &&
                    `: ${examGroups.map((group) => `${group.programmes.length} at ${group.title}`).join(', ')}`}
                </strong>{' '}
                · Listed by last year’s opening rank, not in a recommended preference order.
              </p>
            )}
            {restored && !open && (
              <p role="status" className={styles.restored}>
                Results for the ranks and settings saved in this browser.{' '}
                <button type="button" onClick={openForm}>
                  Edit ranks
                </button>
              </p>
            )}
            {isFetching ? (
              <p role="status">Finding historical comparisons…</p>
            ) : programmes.length ? (
              <>
                <div
                  className={styles.mobilePanes}
                  role="group"
                  aria-label="Prediction results panel"
                >
                  <button
                    type="button"
                    aria-pressed={mobilePane === 'list'}
                    onClick={() => setMobilePane('list')}
                  >
                    Programmes
                  </button>
                  <button
                    ref={evidenceButton}
                    type="button"
                    aria-pressed={mobilePane === 'evidence'}
                    onClick={() => setMobilePane('evidence')}
                  >
                    Evidence
                  </button>
                </div>
                <div className={styles.columns} data-mobile-pane={mobilePane}>
                  <div className={styles.listColumn}>
                    <div className={styles.resultsList}>
                      {examGroups.map((group) => (
                        <section key={group.exam} aria-labelledby={`results-${group.id}`}>
                          <h3 id={`results-${group.id}`} className={styles.groupHeading}>
                            {group.title} <span>{group.programmes.length}</span>
                            <small>
                              {group.basis}
                              {examRankSummary(group.exam, formData?.rankProfiles) &&
                                `: ${examRankSummary(group.exam, formData?.rankProfiles)}`}
                            </small>
                          </h3>
                          {group.programmes.map((programme) => {
                            const saved = choices.some((choice) => choice.id === programme.id);
                            return (
                              <article
                                className={`${styles.result} ${evidence?.id === programme.id ? styles.selected : ''}`}
                                key={programme.id}
                              >
                                <button
                                  type="button"
                                  className={styles.pick}
                                  aria-pressed={evidence?.id === programme.id}
                                  onClick={() => {
                                    setSelected(programme.id);
                                    setMobilePane('evidence');
                                    if (window.matchMedia('(max-width: 950px)').matches)
                                      requestAnimationFrame(() => evidenceButton.current?.focus());
                                  }}
                                >
                                  <span className="badge">
                                    {programmeExam(programme.institute)}
                                  </span>
                                  <strong>{programme.branch.name}</strong>
                                  <span>{programme.institute.name}</span>
                                  <small>
                                    {instituteType(programme.institute)} · {programme.branch.degree}{' '}
                                    · {programme.branch.courseDuration} years
                                  </small>
                                  <span className={styles.rankRows}>
                                    {programme.records.slice(0, 3).map((record, index) => (
                                      <span className={styles.rankRow} key={index}>
                                        <span>
                                          {[
                                            quotaLabel(record.quota),
                                            formData?.rankProfiles.length > 1 && record.category,
                                            formData?.seatPools.length > 1 && record.seatPool,
                                          ]
                                            .filter(Boolean)
                                            .join(', ')}
                                        </span>
                                        <span>
                                          Opening <b>{formatRank(record.openingRank)}</b>
                                        </span>
                                        <span>
                                          Closing <strong>{formatRank(record.closingRank)}</strong>
                                        </span>
                                      </span>
                                    ))}
                                    {programme.records.length > 3 && (
                                      <span className={styles.rankMore}>
                                        {programme.records.length - 3} more in Evidence
                                      </span>
                                    )}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="button small"
                                  disabled={saved}
                                  onClick={() => changeChoices([...choices, programme])}
                                >
                                  {saved ? 'Saved ✓' : '+ Save choice'}
                                </button>
                              </article>
                            );
                          })}
                        </section>
                      ))}
                    </div>
                  </div>
                  <ProgrammeEvidence programme={evidence} />
                </div>
              </>
            ) : (
              !open && (
                <div className={styles.start}>
                  <p className="eyebrow">Your next chapter starts with context</p>
                  <h2>
                    {formData ? 'No comparisons returned.' : 'A considered choice starts here.'}
                  </h2>
                  <p>
                    {formData
                      ? 'Adjust your search window or inspect the full cutoff data. An empty result is not an eligibility decision.'
                      : 'Enter your ranks, explore historical comparisons, then save programmes in your own preference order.'}
                  </p>
                  <Link href="/ranks" prefetch={false}>
                    Explore all historical cutoffs <Icon name="arrowUpRight" />
                  </Link>
                </div>
              )
            )}
            {programmes.length > 0 && (
              <details data-accordion className={styles.allRecords}>
                <summary>
                  All returned allocation rows ({rankData.length}){' '}
                  <Icon name="chevronDown" className="disclosure-chevron" />
                </summary>
                <p>
                  Dataset year is not supplied by the predictor. Rows from different exams or
                  category rank lists are not directly comparable.
                </p>
                <div
                  className="table-surface"
                  role="region"
                  aria-label="All predictor results"
                  tabIndex={0}
                >
                  <table className="records-table">
                    <thead>
                      <tr>
                        {[
                          'Institute',
                          'Type / exam',
                          'Programme',
                          'Degree / duration',
                          'Category',
                          'Quota',
                          'Pool',
                          'Round',
                          'Opening rank',
                          'Closing rank',
                        ].map((label) => (
                          <th scope="col" key={label}>
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rankData.map((record, index) => (
                        <tr key={index}>
                          <td>{record.institute.name}</td>
                          <td>
                            {instituteType(record.institute)} · {programmeExam(record.institute)}
                          </td>
                          <td>{record.branch.name}</td>
                          <td>
                            {record.branch.degree} · {record.branch.courseDuration} years
                          </td>
                          <td>{record.category}</td>
                          <td>{quotaLabel(record.quota)}</td>
                          <td>{record.seatPool}</td>
                          <td>{record.round ?? 'Not supplied'}</td>
                          <td>{record.openingRank}</td>
                          <td>{record.closingRank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}
          </>
        ))}
      <p className={styles.recordNote}>
        Working draft only. Verify current programme availability, eligibility and official data
        before filling choices on JoSAA.{' '}
        <Link href="/methodology" prefetch={false}>
          Understand the comparison method
        </Link>
        .
      </p>
    </div>
  );
}
