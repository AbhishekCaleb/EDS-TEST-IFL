/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero10)'];

  // 2. Background image row
  const bgImg = element.querySelector('img');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  let contentEls = [];
  // Find all headings and paragraphs in the text-image block
  const textImage = element.querySelector('.text-image');
  if (textImage) {
    // Add all children (h1, p, etc.) to contentEls
    Array.from(textImage.children).forEach((child) => {
      contentEls.push(child);
    });
  }
  // Find the CTA button
  const cta = element.querySelector('.bootstrap-button a');
  if (cta) contentEls.push(cta);
  const contentRow = [contentEls];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
