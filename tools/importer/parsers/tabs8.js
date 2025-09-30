/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab wrapper
  const tabWrapper = element.querySelector('.channel-quicklinks-tab-wrapper');
  if (!tabWrapper) return;

  // Find the tab list (ul.nav-tabs) and all tab <li>s
  const navTabs = tabWrapper.querySelector('ul.nav-tabs');
  if (!navTabs) return;
  const tabLis = Array.from(navTabs.children);

  // Get tab labels from <span> inside each <a> in <li>
  const tabLabels = tabLis.map(li => {
    const a = li.querySelector('a');
    if (!a) return '';
    const span = a.querySelector('span');
    if (span) {
      // Remove any child divs (like caret)
      const spanClone = span.cloneNode(true);
      Array.from(spanClone.querySelectorAll('div')).forEach(d => d.remove());
      return spanClone.textContent.trim();
    }
    return a.textContent.trim();
  });

  // Find the tab content container
  const tabContent = tabWrapper.querySelector('.tab-content');
  if (!tabContent) return;
  const tabPanes = Array.from(tabContent.querySelectorAll('.tab-pane'));

  // Build the block table rows
  const headerRow = ['Tabs (tabs8)'];
  const rows = [headerRow];

  // For each tab, get label and content
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    let content = '';
    if (pane) {
      // Remove the 'Close' link row
      const paneClone = pane.cloneNode(true);
      const closeRow = paneClone.querySelector('.row');
      if (closeRow) closeRow.remove();
      // The main content is inside .media-list > .media > .list-item-text
      const listItemText = paneClone.querySelector('.list-item-text');
      if (listItemText) {
        // Instead of using the nested table, flatten all <td> content into a single block
        const tds = Array.from(listItemText.querySelectorAll('td'));
        if (tds.length > 0) {
          // Create a container for all tab content
          const container = document.createElement('div');
          tds.forEach((td, idx) => {
            // Move all children of td into the container, separated by <hr> except after last
            Array.from(td.childNodes).forEach(child => {
              container.appendChild(child.cloneNode(true));
            });
            if (idx < tds.length - 1) {
              container.appendChild(document.createElement('hr'));
            }
          });
          content = container;
        } else {
          content = listItemText;
        }
      } else {
        // fallback: use all children
        content = Array.from(paneClone.childNodes);
      }
    }
    rows.push([label, content]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
