// main.js
import { loadData } from './api.js';
import { initGallery } from './gallery.js';
import { initFormValidation } from './form-validation.js';

document.addEventListener('DOMContentLoaded', () => {
  loadData()
    .then((picturesData) => {
      initGallery(picturesData);
    })
    .catch(() => {
      // Ошибку загрузки игнорируем — по ТЗ не требуется сообщение
    });

  initFormValidation();
});
