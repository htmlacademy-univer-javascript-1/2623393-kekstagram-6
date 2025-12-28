import { loadData } from './api.js';
import { initGallery, showFilters, initFilters } from './gallery.js';
import { initFormValidation } from './form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  loadData()
    .then((picturesData) => {
      initGallery(picturesData);
      showFilters();
      initFilters();
    })
    .catch(() => {
    });

  initFormValidation();
});
