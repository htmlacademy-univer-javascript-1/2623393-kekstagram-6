const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

// Функция для отрисовки одного комментария
const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

// Функция для отрисовки всех комментариев
const renderComments = (comments) => {
  socialCommentsElement.innerHTML = '';

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialCommentsElement.appendChild(commentElement);
  });
};

// Функция открытия полноразмерного изображения
const openFullPicture = (pictureData) => {
  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  socialCaptionElement.textContent = pictureData.description;

  renderComments(pictureData.comments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');

  document.body.classList.add('modal-open');
};

const closeFullPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', () => {
  closeFullPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !bigPictureElement.classList.contains('hidden')) {
    closeFullPicture();
  }
});

export { openFullPicture };
