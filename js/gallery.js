import { renderThumbnails } from './thumbnail-render.js';
import { openFullPicture } from './full-picture.js';
import { debounce } from './util.js';

let currentPictures = [];

const addThumbnailListeners = (picturesData) => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullPicture(picturesData[index]);
    });
  });
};

export const initGallery = (picturesData) => {
  currentPictures = [...picturesData];
  renderThumbnails(picturesData);
  addThumbnailListeners(picturesData);
};

export const showFilters = () => {
  const filtersElement = document.querySelector('.img-filters');
  if (filtersElement) {
    filtersElement.classList.remove('img-filters--inactive');
  }
};

const getFilteredPictures = (filterType) => {
  switch (filterType) {
    case 'random': {
      const shuffled = [...currentPictures].sort(() => 0.5 - Math.random());
      const count = Math.min(10, shuffled.length);
      return shuffled.slice(0, count);
    }
    case 'discussed': {
      return [...currentPictures].sort((a, b) => b.comments.length - a.comments.length);
    }
    case 'default':
    default:
      return [...currentPictures];
  }
};

const applyFilter = (filterType) => {
  const filtered = getFilteredPictures(filterType);
  renderThumbnails(filtered);
  addThumbnailListeners(filtered);
};

const setActiveFilterButton = (filterType) => {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button.dataset.filter === filterType);
  });
};

const debouncedApplyFilter = debounce(applyFilter, 500);

export const initFilters = () => {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterType = button.dataset.filter;
      setActiveFilterButton(filterType);
      debouncedApplyFilter(filterType);
    });
  });

  setActiveFilterButton('default');
  applyFilter('default');
};
