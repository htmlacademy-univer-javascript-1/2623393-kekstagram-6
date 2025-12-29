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
      const errorElement = document.createElement('div');
      errorElement.className = 'data-error';
      errorElement.textContent = 'Ошибка загрузки данных';
      document.body.appendChild(errorElement);
    });

  initFormValidation();
});
