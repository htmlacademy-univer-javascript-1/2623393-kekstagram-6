import { generateObjects } from './data.js';
import { initGallery } from './gallery.js';

const picturesData = generateObjects();

document.addEventListener('DOMContentLoaded', () => {
  initGallery(picturesData);
});
