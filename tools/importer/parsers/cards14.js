/* global WebImporter */
export default function parse(element, { document }) {
  // Find the blogs-aggregator container
  const aggregator = element.querySelector('blogs-aggregator');
  if (!aggregator) return;
  const teaserContainer = aggregator.querySelector('.teaserContainer');
  if (!teaserContainer) return;
  const cardNodes = Array.from(teaserContainer.querySelectorAll(':scope > .sc-htpNat'));

  const rows = [];
  // Block header row as per target block name
  rows.push(['Cards (cards14)']);

  cardNodes.forEach(card => {
    // Each card is a .sc-htpNat, containing .sc-bZQynM > a
    const a = card.querySelector('a');
    if (!a) return;
    // First cell: image (first <img> inside <a>)
    const img = a.querySelector('img');
    // Second cell: blogContainer (all text content)
    const blogContainer = a.querySelector('.blogContainer');
    if (!img || !blogContainer) return;
    // Use DOM elements directly (do not clone)
    rows.push([img, blogContainer]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
