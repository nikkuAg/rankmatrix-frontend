'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLazyGetpredictionDataQuery } from '@/store/queries/prediction';
import { sendAnalyticsEvent } from '@/utils/analyticEvent';
import {
  choiceRows,
  CHOICES_KEY,
  groupProgrammes,
  parseChoices,
  programmeExam,
} from '@/utils/choices.mjs';
import { downloadCSV } from '@/utils/downloadCSV';
import { loadPredictorFormData, savePredictorFormData } from '@/utils/formStorage';
import { instituteType } from '@/utils/instituteIdentity.mjs';
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
  const loaded = useRef(false);
  const workspaceRoot = useRef(null);
  const formOpener = useRef(null);
  const resultsButton = useRef(null);
  const evidenceButton = useRef(null);
  const [getPredictionData, { data: rankData, isFetching }] = useLazyGetpredictionDataQuery();
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reconcile browser storage after hydration */
    setDefaults(loadPredictorFormData());
    try {
      setChoices(parseChoices(window.localStorage.getItem(CHOICES_KEY)));
    } catch {
      setStorageNotice(
        'Browser storage is unavailable. Keep this tab open and export your list before leaving.',
      );
    }
    loaded.current = true;
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
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
      workspaceRoot.current?.querySelector('select[name="category"]')?.focus();
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
  const evidence = programmes.find((programme) => programme.id === selected) || programmes[0];
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
              Export {view === 'choices' ? 'choices' : 'results'} ↓
            </button>
          </div>
        </div>
      )}
      {formData && (
        <div className={styles.context}>
          <dl>
            <div>
              <dt>JEE Main rank</dt>
              <dd>{Number(formData.mainsRank).toLocaleString('en-IN')}</dd>
            </div>
            <div>
              <dt>JEE Advanced rank</dt>
              <dd>
                {formData.advRank
                  ? Number(formData.advRank).toLocaleString('en-IN')
                  : 'Not entered'}
              </dd>
            </div>
            <div>
              <dt>Category / rank list</dt>
              <dd>{formData.category}</dd>
            </div>
            <div>
              <dt>Seat pool</dt>
              <dd>{formData.seatPool}</dd>
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
            {formData && (
              <p className={styles.countline}>
                <strong>
                  {rankData?.length || 0} allocation rows · {programmes.length} programmes
                </strong>{' '}
                · Historical comparison order, not a recommended preference order.
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
                      {programmes.map((programme) => {
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
                              <span className="badge">{programmeExam(programme.institute)}</span>
                              <strong>{programme.branch.name}</strong>
                              <span>{programme.institute.name}</span>
                              <small>
                                {instituteType(programme.institute)} · {programme.branch.degree} ·{' '}
                                {programme.branch.courseDuration} years · {programme.records.length}{' '}
                                allocation {programme.records.length === 1 ? 'record' : 'records'}
                              </small>
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
                    Explore all historical cutoffs ↗
                  </Link>
                </div>
              )
            )}
            {programmes.length > 0 && (
              <details className={styles.allRecords}>
                <summary>All returned allocation rows ({rankData.length})</summary>
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
                  <table>
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
                          <td>{record.quota}</td>
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
