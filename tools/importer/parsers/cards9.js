/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a pair of columns
  function extractCard(colImg, colText) {
    // Find the image (mandatory)
    let img = colImg.querySelector('img');
    // Find the text content
    let textRoot = colText.querySelector('.text-image') || colText;
    // Title: look for h4 or h3
    let title = textRoot.querySelector('h4, h3');
    // Description: all <p> except those containing only links/buttons
    let descPs = Array.from(textRoot.querySelectorAll('p')).filter(p => {
      // If the <p> contains only a link or button, treat as CTA
      return !(p.querySelector('a') && p.textContent.trim() === p.querySelector('a').textContent.trim());
    });
    // CTA: all <a> in <p> (including buttons)
    let ctas = [];
    Array.from(textRoot.querySelectorAll('a')).forEach(a => {
      ctas.push(a);
    });
    // Build text cell content
    let textCell = [];
    if (title) textCell.push(title);
    descPs.forEach(p => textCell.push(p));
    if (ctas.length) {
      ctas.forEach((cta, i) => {
        textCell.push(cta);
        if (i < ctas.length - 1) textCell.push(document.createElement('br'));
      });
    }
    return [img, textCell];
  }

  // Find the two main columns (cards)
  const cards = [];
  // The structure is: ... > .container > .row > col1, col2
  const container = element.querySelector('.container');
  if (!container) return;
  const mainRow = container.querySelector('.row');
  if (!mainRow) return;
  const mainCols = mainRow.querySelectorAll(':scope > div');
  mainCols.forEach(col => {
    // Each col has a .row with two columns: image and text
    const innerRow = col.querySelector('.row');
    if (!innerRow) return;
    const innerCols = innerRow.querySelectorAll(':scope > div');
    if (innerCols.length < 2) return;
    const card = extractCard(innerCols[0], innerCols[1]);
    cards.push(card);
  });

  // Build table rows
  const headerRow = ['Cards (cards9)'];
  const tableRows = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
