/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(child => child.classList.contains(className));
  }

  // Find the main row with columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get all direct column divs in the row
  const columns = Array.from(row.children).filter(col => col.classList.contains('col-custom'));

  // Defensive: expect 2 columns for this layout
  if (columns.length < 2) return;

  // First column: left text + button
  const leftCol = columns[0];
  // The content is inside .bootstrap-text-image
  const leftContent = leftCol.querySelector('.bootstrap-text-image');

  // Second column: image
  const rightCol = columns[1];
  // The image is inside .media-left > img
  let rightImg = null;
  const mediaLeft = rightCol.querySelector('.media-left');
  if (mediaLeft) {
    rightImg = mediaLeft.querySelector('img');
  }

  // Build the table rows
  const headerRow = ['Columns (columns13)'];

  // Compose left cell: the entire left column content (text, list, button)
  // We'll gather the main content and the button
  let leftCellContent = [];
  if (leftContent) {
    // Get the text-image div (contains h2 and ul)
    const textImage = leftContent.querySelector('.text-image');
    if (textImage) leftCellContent.push(textImage);
    // Get the button (if any)
    const buttonDiv = leftContent.querySelector('.bootstrap-button');
    if (buttonDiv) leftCellContent.push(buttonDiv);
  }

  // Compose right cell: the image (if present)
  let rightCellContent = [];
  if (rightImg) rightCellContent.push(rightImg);

  // Compose the table
  const tableRows = [
    headerRow,
    [leftCellContent, rightCellContent],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
