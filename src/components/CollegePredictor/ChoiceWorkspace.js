'use client';

import { useRef, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@/components/Icon';
import { programmeExam, reorderChoices } from '@/utils/choices.mjs';
import { ProgrammeEvidence } from './ProgrammeEvidence';
import styles from './Workspace.module.css';

function ChoiceRow({
  choice,
  position,
  selected,
  onSelect,
  compared,
  onCompare,
  compareFull,
  disabled,
  onRemove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: choice.id, disabled });
  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
      }}
      className={`${styles.choiceRow} ${selected ? styles.selected : ''}`}
    >
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        type="button"
        className={styles.grip}
        disabled={disabled}
        aria-label={`Reorder preference ${position}: ${choice.branch.name}, ${choice.institute.name}`}
      >
        <Icon name="grip" />
      </button>
      <span className={styles.position}>{String(position).padStart(2, '0')}</span>
      <button
        type="button"
        className={styles.pick}
        aria-pressed={selected}
        aria-label={`Inspect ${choice.branch.name}, ${choice.institute.name}`}
        onClick={onSelect}
      >
        <strong>{choice.branch.name}</strong>
        <span>{choice.institute.name}</span>
        <small>
          {choice.branch.degree} · {choice.branch.courseDuration} years
        </small>
      </button>
      <span className={styles.exam}>
        {programmeExam(choice.institute)}
        <small>
          {choice.records.length} allocation {choice.records.length === 1 ? 'record' : 'records'}
        </small>
      </span>
      <label className={styles.compareCheck}>
        <span className="sr-only">
          Compare {choice.branch.name}, {choice.institute.name}
        </span>
        <input
          type="checkbox"
          checked={compared}
          disabled={!compared && compareFull}
          onChange={onCompare}
        />
        <span className={styles.compareLabel} aria-hidden="true">
          Compare
        </span>
      </label>
      <button
        type="button"
        className={`icon-button ${styles.removeChoice}`}
        aria-label={`Remove ${choice.branch.name}, ${choice.institute.name}`}
        onClick={onRemove}
      >
        <Icon name="close" />
      </button>
    </li>
  );
}

export function ChoiceWorkspace({ choices, onChange }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [exam, setExam] = useState('all');
  const [compare, setCompare] = useState([]);
  const [previous, setPrevious] = useState(null);
  const [active, setActive] = useState(null);
  const [message, setMessage] = useState('');
  const [mobilePane, setMobilePane] = useState('list');
  const dialog = useRef(null);
  const compareButton = useRef(null);
  const evidenceButton = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const filtered = search.trim() !== '' || exam !== 'all';
  const visible = choices.filter(
    (choice) =>
      (!search.trim() ||
        `${choice.branch.name} ${choice.institute.name} ${choice.branch.degree}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())) &&
      (exam === 'all' || programmeExam(choice.institute) === exam),
  );
  const evidence = visible.find((choice) => choice.id === selected) || visible[0];
  const comparison = choices.filter((choice) => compare.includes(choice.id));
  function update(next, text) {
    setPrevious(choices);
    onChange(next);
    setMessage(text);
  }
  function finish({ active, over }) {
    setActive(null);
    if (!over || active.id === over.id) return;
    const next = reorderChoices(choices, active.id, over.id);
    update(next, `Moved to preference ${next.findIndex((choice) => choice.id === active.id) + 1}.`);
  }
  function inspect(id) {
    setSelected(id);
    setMobilePane('evidence');
    if (window.matchMedia('(max-width: 950px)').matches)
      requestAnimationFrame(() => evidenceButton.current?.focus());
  }
  return (
    <section className={styles.workspace} aria-label="My choice list">
      <div className={styles.workspaceFilters}>
        <label className="field search">
          Find in my choices
          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setMobilePane('list');
            }}
            placeholder="Institute or programme"
          />
        </label>
        <label className="field">
          Exam
          <select
            value={exam}
            onChange={(event) => {
              setExam(event.target.value);
              setMobilePane('list');
            }}
          >
            <option value="all">Both exams</option>
            <option>JEE Main</option>
            <option>JEE Advanced</option>
            <option>Verify exam</option>
          </select>
        </label>
        <button
          type="button"
          className="button"
          onClick={() => {
            setSearch('');
            setExam('all');
            setMobilePane('list');
          }}
        >
          Clear filters
        </button>
        <button
          ref={compareButton}
          type="button"
          className="button primary"
          disabled={comparison.length < 2}
          onClick={() => dialog.current.showModal()}
        >
          Compare {comparison.length} / 3
        </button>
      </div>
      <p className={styles.countline}>
        <strong>{choices.length} choices</strong> · your preference order{' '}
        {filtered && `· ${visible.length} shown`}
      </p>
      {comparison.length > 0 && (
        <div className={styles.comparisonTray} aria-label="Programmes selected for comparison">
          <span>Comparing {comparison.length} / 3</span>
          {comparison.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => setCompare((current) => current.filter((id) => id !== choice.id))}
              aria-label={`Remove ${choice.branch.name}, ${choice.institute.name} from comparison`}
            >
              <span>
                {String(choices.indexOf(choice) + 1).padStart(2, '0')} · {choice.branch.name}
                <small>{choice.institute.name}</small>
              </span>
              <Icon name="close" />
            </button>
          ))}
          <small>Comparison selections do not change your preference order.</small>
        </div>
      )}
      <div className={styles.mobilePanes} role="group" aria-label="Choice list panel">
        <button
          type="button"
          aria-pressed={mobilePane === 'list'}
          onClick={() => setMobilePane('list')}
        >
          My list
        </button>
        <button
          ref={evidenceButton}
          type="button"
          disabled={!evidence}
          aria-pressed={mobilePane === 'evidence'}
          onClick={() => setMobilePane('evidence')}
        >
          Evidence{evidence ? ` · ${choices.indexOf(evidence) + 1}` : ''}
        </button>
      </div>
      <div className={styles.columns} data-mobile-pane={mobilePane}>
        <div className={styles.listColumn}>
          <div className={styles.listToolbar}>
            <span>
              {filtered
                ? 'Clear filters to reorder the full list.'
                : 'Drag a grip to change your order.'}
            </span>
            <button
              type="button"
              className="button small"
              disabled={!previous}
              onClick={() => {
                onChange(previous);
                setPrevious(null);
                setMessage('Previous list restored.');
              }}
            >
              <Icon name="undo" /> Undo
            </button>
          </div>
          <details data-accordion className={styles.keyboardHelp}>
            <summary>
              Keyboard help <Icon name="chevronDown" className="disclosure-chevron" />
            </summary>
            <p>
              Focus a grip, press Space to pick up, use arrow keys to move, then Space to drop.
              Escape cancels. The list scrolls as you move through longer lists.
            </p>
          </details>
          <div className={styles.listHeading} aria-hidden="true">
            <span>Order</span>
            <span>Programme / institute</span>
            <span>Record context</span>
            <span>Compare</span>
            <span></span>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={({ active }) => setActive(active.id)}
            onDragEnd={finish}
            onDragCancel={() => setActive(null)}
          >
            <SortableContext
              items={visible.map((choice) => choice.id)}
              strategy={verticalListSortingStrategy}
            >
              <ol className={styles.choices}>
                {visible.map((choice) => (
                  <ChoiceRow
                    key={choice.id}
                    choice={choice}
                    position={choices.indexOf(choice) + 1}
                    selected={evidence?.id === choice.id}
                    onSelect={() => inspect(choice.id)}
                    compared={compare.includes(choice.id)}
                    onCompare={() =>
                      setCompare((previous) =>
                        previous.includes(choice.id)
                          ? previous.filter((id) => id !== choice.id)
                          : [...previous, choice.id],
                      )
                    }
                    compareFull={comparison.length >= 3}
                    disabled={filtered}
                    onRemove={() => {
                      update(
                        choices.filter((item) => item.id !== choice.id),
                        'Choice removed. Use Undo to restore it.',
                      );
                      setCompare((previous) => previous.filter((id) => id !== choice.id));
                    }}
                  />
                ))}
              </ol>
            </SortableContext>
            <DragOverlay>
              {active ? (
                <div className={styles.dragOverlay}>
                  {choices.find((choice) => choice.id === active)?.branch.name}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
          {!visible.length && (
            <div className="empty-state">
              {choices.length
                ? 'No choices match these filters.'
                : 'Save programmes from your predictor results to start your list.'}
            </div>
          )}
          <p className={styles.recordNote}>
            One choice = one institute + programme. Its allocation records stay together. Your list
            is a local working draft; complete official choice filling on JoSAA.
          </p>
          <p className="sr-only" role="status">
            {message}
          </p>
        </div>
        <ProgrammeEvidence
          programme={evidence}
          preference={evidence ? choices.indexOf(evidence) + 1 : undefined}
        />
      </div>
      <dialog
        ref={dialog}
        className={styles.compareDialog}
        aria-labelledby="compare-title"
        onClose={() => compareButton.current?.focus()}
      >
        <header>
          <div>
            <p className="eyebrow">Side by side</p>
            <h2 id="compare-title">Compare your programmes</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close comparison"
            onClick={() => dialog.current.close()}
          >
            <Icon name="close" />
          </button>
        </header>
        <p>
          Each programme keeps its own exam, rank list and allocation records. Numbers across
          different rank scales are not directly comparable.
        </p>
        <div className={styles.compareGrid}>
          {comparison.map((choice) => (
            <ProgrammeEvidence key={choice.id} programme={choice} />
          ))}
        </div>
      </dialog>
    </section>
  );
}
