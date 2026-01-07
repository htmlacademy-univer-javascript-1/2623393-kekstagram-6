import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { initScale, destroyScale } from './scale.js';
import { initEffects, destroyEffects } from './effects.js';
import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

let pristine;

const validateHashtagCount = (value) => {
  const hashtags = value.trim().split(' ').filter((tag) => tag !== '');
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const validateHashtagFormat = (value) => {
  const hashtags = value.trim().split(' ').filter((tag) => tag !== '');

  if (hashtags.length === 0) {
    return true;
  }

  return hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateHashtagUniqueness = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((tag) => tag !== '');
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

const getHashtagCountError = () => `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`;

const getHashtagFormatError = () => 'Хэш-тег должен начинаться с # и содержать только буквы и цифры (1-19 символов после #)';

const getHashtagUniquenessError = () => 'Хэш-теги не должны повторяться';

const getDescriptionError = () => `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`;

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

const initValidation = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'pristine-error'
  });

  pristine.addValidator(
    hashtagInput,
    validateHashtagCount,
    getHashtagCountError,
    2,
    true
  );

  pristine.addValidator(
    hashtagInput,
    validateHashtagFormat,
    getHashtagFormatError,
    1,
    true
  );

  pristine.addValidator(
    hashtagInput,
    validateHashtagUniqueness,
    getHashtagUniquenessError,
    3,
    true
  );

  pristine.addValidator(
    commentInput,
    validateDescription,
    getDescriptionError
  );
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initScale();
  initEffects();

};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  destroyScale();
  destroyEffects();

  const previewImage = uploadForm.querySelector('.img-upload__preview img');
  if (previewImage.src) {
    URL.revokeObjectURL(previewImage.src);
    previewImage.src = '';
  }

  const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
  effectsPreviews.forEach((preview) => {
    const bgStyle = preview.style.backgroundImage;
    const matchResult = bgStyle.match(/url\("?(.*?)"?\)/);
    const bgUrl = matchResult ? matchResult[1] : null;

    if (bgUrl && bgUrl.startsWith('blob:')) {
      URL.revokeObjectURL(bgUrl);
      preview.style.backgroundImage = '';
    }
  });

  uploadInput.value = '';
  uploadForm.reset();

  if (pristine) {
    pristine.reset();
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  toggleSubmitButton(true);

  try {
    const formData = new FormData(evt.target);

    await sendData(formData);

    showSuccessMessage();
    closeUploadForm();
  } catch (err) {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

const initFormValidation = () => {
  if (!uploadInput || !uploadOverlay) {
    return;
  }

  initValidation();

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);

      const previewImage = uploadForm.querySelector('.img-upload__preview img');
      previewImage.src = blobUrl;

      const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${blobUrl})`;
      });

      openUploadForm();
    }
  });

  uploadCancel.addEventListener('click', closeUploadForm);

  document.addEventListener('keydown', (evt) => {
    if (
      isEscapeKey(evt) &&
      !uploadOverlay.classList.contains('hidden') &&
      !document.querySelector('.success') &&
      !document.querySelector('.error') &&
      document.activeElement !== hashtagInput &&
      document.activeElement !== commentInput
    ) {
      closeUploadForm();
    }
  });

  uploadForm.addEventListener('submit', onFormSubmit);
};

export { initFormValidation };
