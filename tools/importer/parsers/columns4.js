/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Defensive: Find the main content container
  const container = element.querySelector('.cookie-warning.container.alert') || element;

  // Find the main message paragraph
  const message = container.querySelector('p');

  // Find the actions container
  const actions = container.querySelector('.cookie-notification__actions');
  let actionLinks = [];
  if (actions) {
    // Get all links and buttons inside actions
    const links = Array.from(actions.querySelectorAll('a'));
    const buttons = Array.from(actions.querySelectorAll('button'));
    actionLinks = [...links, ...buttons];
  }

  // First column: message
  // Second column: actions (links/buttons)
  const contentRow = [
    message ? message : '',
    actionLinks.length ? actionLinks : ''
  ];

  const rows = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
