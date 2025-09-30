/* global WebImporter */
export default function parse(element, { document }) {
  // Select all card columns directly under the row
  const cardColumns = element.querySelectorAll(':scope > .row > div');
  const headerRow = ['Cards (cardsNoImages7)'];
  const rows = [headerRow];

  cardColumns.forEach((col) => {
    // Find the .text-image container for card content
    const textImage = col.querySelector('.text-image');
    if (!textImage) return;

    // Prepare a fragment to preserve order and formatting
    const frag = document.createDocumentFragment();
    Array.from(textImage.childNodes).forEach((node) => {
      if (node.nodeType === 1) {
        // Element node: reference directly
        frag.appendChild(node);
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // Text node: wrap in span to preserve
        const span = document.createElement('span');
        span.textContent = node.textContent;
        frag.appendChild(span);
      }
    });
    rows.push([frag]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
