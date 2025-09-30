/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the logo (desktop preferred, fallback to mobile)
  function getLogoCell() {
    let logoDiv = element.querySelector('.hidden-xs.brand-info');
    if (!logoDiv) {
      // fallback to visible-xs with .navbar-brand
      logoDiv = Array.from(element.querySelectorAll('.visible-xs')).find(div => div.querySelector('.navbar-brand img'));
    }
    if (logoDiv) {
      const link = logoDiv.querySelector('a.navbar-brand');
      if (link) return link.cloneNode(true);
    }
    return '';
  }

  // Helper to get the CTA buttons (desktop preferred)
  function getDesktopCtasCell() {
    const ctaDiv = element.querySelector('#mlc-header-buttons-desktop');
    if (ctaDiv) {
      const ul = ctaDiv.querySelector('ul');
      if (ul) {
        return ul.cloneNode(true);
      }
    }
    return '';
  }

  // Always use the required header row
  const headerRow = ['Columns (columns3)'];
  // Only include columns that have content (logo, ctas)
  const cells = [];
  const logoCell = getLogoCell();
  if (logoCell) cells.push(logoCell);
  const ctaCell = getDesktopCtasCell();
  if (ctaCell) cells.push(ctaCell);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);

  element.replaceWith(table);
}
