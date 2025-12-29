const createThumbnailElement = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');
  const thumbnailElement = pictureTemplate.content.cloneNode(true);

  const image = thumbnailElement.querySelector('.picture__img');
  const likesElement = thumbnailElement.querySelector('.picture__likes');
  const commentsElement = thumbnailElement.querySelector('.picture__comments');

  image.src = pictureData.url;
  image.alt = pictureData.description;
  likesElement.textContent = pictureData.likes;
  commentsElement.textContent = pictureData.comments.length;

  thumbnailElement.querySelector('.picture').dataset.id = pictureData.id;

  return thumbnailElement;
};

const renderThumbnails = (picturesData) => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const thumbnailElements = [];

  const existingPictures = picturesContainer.querySelectorAll('.picture:not([data-template])');
  existingPictures.forEach((picture) => picture.remove());

  picturesData.forEach((pictureData) => {
    const thumbnailNode = createThumbnailElement(pictureData);
    fragment.appendChild(thumbnailNode);
    const pictureElement = thumbnailNode.querySelector('.picture');
    if (pictureElement) {
      thumbnailElements.push(pictureElement);
    }
  });

  picturesContainer.appendChild(fragment);
  return thumbnailElements;
};

export { renderThumbnails };
