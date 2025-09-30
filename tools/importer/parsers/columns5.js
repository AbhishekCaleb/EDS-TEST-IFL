/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns5)'];

  // Defensive: find the row containing the columns
  const row = element.querySelector('.row');
  if (!row) {
    // fallback: replace with just the header if structure is unexpected
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Each direct child of .row is a column
  const columns = Array.from(row.children);

  // For each column, find the main content block (usually .bootstrap-text-image or similar)
  const cells = columns.map((col) => {
    // Defensive: find the deepest .text-image or just use the column
    let content = col.querySelector('.text-image');
    if (!content) {
      // fallback: use the whole column if .text-image is missing
      content = col;
    }
    return content;
  });

  // Table: header row, then one row with all columns as cells
  const tableRows = [headerRow, cells];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
