export function setupDisclosureMotion(root = document) {
  const active = new Map();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function finish(details, expanded) {
    const current = active.get(details);
    active.delete(details);
    current?.animation.cancel();
    details.open = expanded;
    details.style.removeProperty('height');
    details.style.removeProperty('overflow');
    delete details.dataset.expanded;
  }

  function toggle(event) {
    const summary = event.target.closest('summary');
    const details = summary?.parentElement;
    if (
      event.defaultPrevented ||
      !details?.matches('details[data-accordion]') ||
      event.target.closest('a, button, input, select') ||
      reducedMotion.matches ||
      !details.animate
    )
      return;

    event.preventDefault();
    const current = active.get(details);
    const expanded = !(current?.expanded ?? details.open);
    const start = details.getBoundingClientRect().height;
    current?.animation.cancel();
    details.style.removeProperty('height');
    details.open = true;
    const style = getComputedStyle(details);
    const collapsed =
      summary.getBoundingClientRect().height +
      ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'].reduce(
        (total, property) => total + (parseFloat(style[property]) || 0),
        0,
      );
    const end = expanded ? details.getBoundingClientRect().height : collapsed;
    details.dataset.expanded = String(expanded);
    details.style.overflow = 'hidden';
    details.style.height = `${start}px`;
    const animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
      duration: 360,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
    active.set(details, { expanded, animation });
    animation.onfinish = () => {
      if (active.get(details)?.animation === animation) finish(details, expanded);
    };
  }

  const settle = () => {
    for (const [details, { expanded }] of active) finish(details, expanded);
  };
  root.addEventListener('click', toggle);
  window.addEventListener('resize', settle);
  reducedMotion.addEventListener('change', settle);
  return () => {
    root.removeEventListener('click', toggle);
    window.removeEventListener('resize', settle);
    reducedMotion.removeEventListener('change', settle);
    settle();
  };
}
