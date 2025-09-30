/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all slides from the carousel
  function getSlides(root) {
    const carouselInner = root.querySelector('.carousel-inner');
    if (!carouselInner) return [];
    return Array.from(carouselInner.querySelectorAll('.item'));
  }

  // Helper to extract image and full text content from a slide
  function extractSlideContent(slide) {
    // Image: first <img> in the slide (reference the actual element)
    const img = slide.querySelector('img');
    // Text: .carousel-caption (reference the actual element, not just .list-item-text)
    let textContent = null;
    const caption = slide.querySelector('.carousel-caption');
    if (caption) {
      textContent = caption;
    }
    return [img, textContent];
  }

  // Find the carousel root
  const carousel = element.querySelector('.carousel');
  if (!carousel) return;

  // Build the table rows
  const rows = [];
  // Header row (must match block name exactly)
  const headerRow = ['Carousel (carousel11)'];
  rows.push(headerRow);

  // Slides
  const slides = getSlides(carousel);
  slides.forEach((slide) => {
    const [img, textContent] = extractSlideContent(slide);
    // Only include the image if it exists
    if (img) {
      rows.push([
        img,
        textContent ? textContent : '',
      ]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
