/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the columns: direct children of .row
  const row = element.querySelector('.row');
  let columns = [];
  if (row) {
    columns = Array.from(row.children);
  } else {
    // fallback: try direct children
    columns = Array.from(element.children);
  }

  // 2. For each column, extract the main content block (the .bootstrap-text-image or fallback to column)
  const cells = columns.map((col) => {
    // Try to find the actual content container
    const content = col.querySelector('.bootstrap-text-image') || col;
    // Return the reference to the content node (not a clone)
    return content;
  });

  // 3. Build the table rows
  const headerRow = ['Columns (columns15)'];
  const tableRows = [headerRow, cells];

  // 4. Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
