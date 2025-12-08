import { renderThumbnails } from './thumbnail-render.js';
import { openFullPicture } from './full-picture.js';

const initGallery = (picturesData) => {
  renderThumbnails(picturesData);

  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();

      const pictureData = picturesData[index];

      openFullPicture(pictureData);
    });
  });
};

export { initGallery };
