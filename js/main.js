// main.js
import { generateObjects } from './data.js';
import { initGallery } from './gallery.js';
import { initFormValidation } from './form-validation.js';

const picturesData = generateObjects();

document.addEventListener('DOMContentLoaded', () => {
  initGallery(picturesData);

  initFormValidation();
});
