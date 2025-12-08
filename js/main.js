import { generateObjects } from './data.js';
import { renderThumbnails } from './thumbnail-render.js';

const picturesData = generateObjects();

document.addEventListener('DOMContentLoaded', () => {
  renderThumbnails(picturesData);
});
