import { Children, cloneElement, Fragment, isValidElement } from 'react';

const headingText = (children) =>
  Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      return isValidElement(child) ? headingText(child.props.children) : '';
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();

// Build contents on the server without invoking child components or scanning
// the browser DOM. Existing anchors are preserved, including nested headings.
export function withHeadingAnchors(children, { prefix = 'section', level = 'h2' } = {}) {
  const headings = [];
  const used = new Set();
  function collectIds(nodes) {
    Children.forEach(nodes, (node) => {
      if (!isValidElement(node)) return;
      if (node.props.id) used.add(node.props.id);
      if (node.props.children) collectIds(node.props.children);
    });
  }
  collectIds(children);
  function visit(nodes) {
    return Children.map(nodes, (node) => {
      if (!isValidElement(node)) return node;
      const props = {};
      if (node.type === level) {
        const title = headingText(node.props.children);
        const slug = title
          .toLowerCase()
          .normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        const base = `${prefix}-${slug || 'topic'}`;
        let id = node.props.id || base;
        if (!node.props.id) {
          let suffix = 2;
          while (used.has(id)) id = `${base}-${suffix++}`;
          used.add(id);
        }
        props.id = id;
        headings.push({ id, title });
      }
      if (node.props.children) props.children = visit(node.props.children);
      return cloneElement(node, props);
    });
  }
  const content = visit(children);
  return { content, headings };
}

export function articleSections(children) {
  const flat = [];
  function flatten(nodes) {
    Children.forEach(nodes, (node) => {
      if (isValidElement(node) && node.type === Fragment) flatten(node.props.children);
      else if (node !== null && node !== false) flat.push(node);
    });
  }
  flatten(children);
  const sections = [];
  for (const node of flat) {
    if (!sections.length || (isValidElement(node) && node.type === 'h2')) {
      sections.push({ id: node?.props?.id, children: [] });
    }
    sections[sections.length - 1].children.push(node);
  }
  return sections;
}
