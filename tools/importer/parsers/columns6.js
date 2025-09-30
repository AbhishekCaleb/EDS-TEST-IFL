/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .row.footer-bg (the columns row)
  const container = element.querySelector('.row.footer-bg');
  if (!container) return;

  // Find the three columns by their unique IDs
  const col1 = container.querySelector('[id*="col-footer_bootstrap_row_col1"]');
  const col2 = container.querySelector('[id*="col-footer_bootstrap_row_col2"]');
  const col3 = container.querySelector('[id*="col-footer_bootstrap_row_col3"]');

  if (!col1 || !col2 || !col3) return;

  // COLUMN 1: Navigation links (include heading if present)
  let col1Cell = document.createElement('div');
  // Get all direct children (not just ul)
  Array.from(col1.children).forEach((child) => {
    // Include all text and elements
    col1Cell.appendChild(child.cloneNode(true));
  });
  if (!col1Cell.hasChildNodes()) col1Cell = '';

  // COLUMN 2: Connect with us (include all content)
  let col2Cell = document.createElement('div');
  Array.from(col2.children).forEach((child) => {
    col2Cell.appendChild(child.cloneNode(true));
  });
  if (!col2Cell.hasChildNodes()) col2Cell = '';

  // COLUMN 3: Download the MLC app (include all content)
  let col3Cell = document.createElement('div');
  Array.from(col3.children).forEach((child) => {
    col3Cell.appendChild(child.cloneNode(true));
  });
  if (!col3Cell.hasChildNodes()) col3Cell = '';

  // Compose the table
  const headerRow = ['Columns (columns6)'];
  const contentRow = [col1Cell, col2Cell, col3Cell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
