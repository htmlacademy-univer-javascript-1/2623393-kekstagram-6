import { loadData } from './api.js';
import { initGallery, showFilters, initFilters } from './gallery.js';
import { initFormValidation } from './form-validation.js';
import { showDataError } from './message.js';

document.addEventListener('DOMContentLoaded', () => {
  loadData()
    .then((picturesData) => {
      initGallery(picturesData);
      showFilters();
      initFilters();
    })
    .catch(() => {
      showDataError();
    });

  initFormValidation();
});
