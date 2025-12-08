const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;
let currentComments = [];
let renderedCommentsCount = 0;

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

// Функция для отрисовки порции комментариев
const renderCommentsPortion = () => {
  const commentsToRender = currentComments.slice(
    renderedCommentsCount,
    renderedCommentsCount + COMMENTS_PER_PORTION
  );

  commentsToRender.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialCommentsElement.appendChild(commentElement);
  });

  renderedCommentsCount += commentsToRender.length;

  commentCountBlock.innerHTML = `${renderedCommentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  if (renderedCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderComments = (comments) => {
  socialCommentsElement.innerHTML = '';
  currentComments = comments;
  renderedCommentsCount = 0;

  renderCommentsPortion();
};

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

// Функция открытия полноразмерного изображения
const openFullPicture = (pictureData) => {
  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  socialCaptionElement.textContent = pictureData.description;

  renderComments(pictureData.comments);

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const closeFullPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
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
