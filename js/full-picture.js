import { isEscapeKey } from './util.js';

let fullScreenModal = null;
let bigPictureImage = null;
let likesCountElement = null;
let commentsCountElement = null;
let socialCommentsElement = null;
let socialCaptionElement = null;
let commentCountBlock = null;
let commentsLoader = null;
let closeButton = null;

let closeButtonClickHandler = null;
let documentKeydownHandler = null;
let commentsLoaderClickHandler = null;

const COMMENTS_PER_PORTION = 5;


const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(img);
  commentElement.appendChild(text);

  return commentElement;
};

const renderCommentsPortion = (comments, renderedCount, container, loader, countBlock) => {
  const commentsToRender = comments.slice(
    renderedCount,
    renderedCount + COMMENTS_PER_PORTION
  );

  if (commentsToRender.length === 0) {
    return renderedCount;
  }

  const fragment = document.createDocumentFragment();
  commentsToRender.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  container.appendChild(fragment);

  const newRenderedCount = renderedCount + commentsToRender.length;

  countBlock.textContent = '';

  const shownSpan = document.createElement('span');
  shownSpan.classList.add('social__comment-shown-count');
  shownSpan.textContent = newRenderedCount;

  const totalSpan = document.createElement('span');
  totalSpan.classList.add('social__comment-total-count');
  totalSpan.textContent = comments.length;

  countBlock.append(shownSpan, ' из ', totalSpan, ' комментариев');

  if (newRenderedCount >= comments.length) {
    loader.classList.add('hidden');
  } else {
    loader.classList.remove('hidden');
  }

  return newRenderedCount;
};

const closeFullPicture = () => {
  if (!fullScreenModal || fullScreenModal.classList.contains('hidden')) {
    return;
  }

  fullScreenModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  if (closeButton && closeButtonClickHandler) {
    closeButton.removeEventListener('click', closeButtonClickHandler);
  }

  if (documentKeydownHandler) {
    document.removeEventListener('keydown', documentKeydownHandler);
  }

  if (commentsLoader && commentsLoaderClickHandler) {
    commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
  }

  closeButtonClickHandler = null;
  documentKeydownHandler = null;
  commentsLoaderClickHandler = null;

  if (socialCommentsElement) {
    socialCommentsElement.innerHTML = '';
  }
  if (commentCountBlock) {
    commentCountBlock.textContent = '';
  }
};

const initDomElements = () => {
  if (!fullScreenModal) {
    const element = document.querySelector('.big-picture');

    if (element) {
      const image = element.querySelector('.big-picture__img img');
      const likes = element.querySelector('.likes-count');
      const commentsCount = element.querySelector('.comments-count');
      const socialComments = element.querySelector('.social__comments');
      const caption = element.querySelector('.social__caption');
      const commentCountBlk = element.querySelector('.social__comment-count');
      const loader = element.querySelector('.comments-loader');
      const closeBtn = element.querySelector('.big-picture__cancel');

      if (image && likes && commentsCount && socialComments && caption && commentCountBlk && loader && closeBtn) {
        fullScreenModal = element;
        bigPictureImage = image;
        likesCountElement = likes;
        commentsCountElement = commentsCount;
        socialCommentsElement = socialComments;
        socialCaptionElement = caption;
        commentCountBlock = commentCountBlk;
        commentsLoader = loader;
        closeButton = closeBtn;
      }
    }
  }
};

const renderComments = (comments) => {
  if (!socialCommentsElement || !commentsLoader || !commentCountBlock) {
    return;
  }

  socialCommentsElement.innerHTML = '';
  commentCountBlock.textContent = '';

  let renderedCount = 0;
  renderedCount = renderCommentsPortion(
    comments,
    renderedCount,
    socialCommentsElement,
    commentsLoader,
    commentCountBlock
  );

  commentsLoaderClickHandler = () => {
    renderedCount = renderCommentsPortion(
      comments,
      renderedCount,
      socialCommentsElement,
      commentsLoader,
      commentCountBlock
    );
  };

  if (comments.length <= COMMENTS_PER_PORTION) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const openFullPicture = (pictureData) => {
  initDomElements();

  if (
    !fullScreenModal ||
    !bigPictureImage ||
    !likesCountElement ||
    !commentsCountElement ||
    !socialCommentsElement ||
    !socialCaptionElement ||
    !commentCountBlock ||
    !commentsLoader ||
    !closeButton
  ) {
    return;
  }

  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsCountElement.textContent = pictureData.comments.length;
  socialCaptionElement.textContent = pictureData.description;

  renderComments(pictureData.comments);

  commentCountBlock.classList.remove('hidden');
  fullScreenModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButtonClickHandler = () => {
    closeFullPicture();
  };

  documentKeydownHandler = (evt) => {
    if (isEscapeKey(evt) && fullScreenModal && !fullScreenModal.classList.contains('hidden')) {
      closeFullPicture();
    }
  };

  closeButton.addEventListener('click', closeButtonClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  commentsLoader.addEventListener('click', commentsLoaderClickHandler);
};

export { openFullPicture };
