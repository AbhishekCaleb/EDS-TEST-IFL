/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct child columns (skip wrappers)
  function getDirectColumns(rowEl) {
    // Only get direct children with class col-custom
    return Array.from(rowEl.children).filter(child => child.classList.contains('col-custom'));
  }

  // Find the main row containing the columns
  const mainRow = element.querySelector('.row');
  if (!mainRow) return;

  // Find all columns (there are 5 in the screenshot and HTML)
  const columns = getDirectColumns(mainRow);

  // Defensive: If columns < 1, bail
  if (columns.length < 1) return;

  // Get the two header statements (centered text above columns)
  // These are inside the first col-custom, and each in a .bootstrap-text-image
  let headerEls = [];
  const firstCol = columns[0];
  if (firstCol) {
    // Find all h2 in .bootstrap-text-image
    headerEls = Array.from(firstCol.querySelectorAll('h2'));
  }

  // Build the header row
  const headerRow = ['Columns (columns12)'];

  // Compose the header cell (combine both h2s)
  const headerCell = document.createElement('div');
  headerEls.forEach(el => headerCell.appendChild(el));

  // Now, build the columns row: each column is a cell
  // For each col-custom except the first (which is only headers), build its cell
  // But in the HTML, the first col-custom only has headers, so skip it for columns
  const columnCells = columns.slice(1).map(colEl => {
    // For each column, combine all its children into a wrapper div
    const cellDiv = document.createElement('div');
    // Get all .bootstrap-text-image children (each has media/text-image)
    const contentBlocks = Array.from(colEl.children);
    contentBlocks.forEach(block => {
      cellDiv.appendChild(block);
    });
    return cellDiv;
  });

  // The table will have:
  // - Header row (1 col)
  // - Header statement row (1 col, both h2s)
  // - Columns row (4 cols, each cell is a column)
  const cells = [
    headerRow,
    [headerCell],
    columnCells
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
