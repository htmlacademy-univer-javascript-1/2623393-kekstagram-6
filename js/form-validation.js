import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

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

// Функции валидации хэштегов
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

// Функция валидации комментария
const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

// Сообщения об ошибках
const getHashtagCountError = () => `Нельзя указать больше ${MAX_HASHTAG_COUNT} хэш-тегов`;

const getHashtagFormatError = () => 'Хэш-тег должен начинаться с # и содержать только буквы и цифры (1-19 символов после #)';

const getHashtagUniquenessError = () => 'Хэш-теги не должны повторяться';

const getDescriptionError = () => `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов`;

// Обработка клавиши Esc
const stopPropagation = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

// Блокировка кнопки отправки
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Публикую...' : 'Опубликовать';
};

// Инициализация Pristine
const initValidation = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  // Валидация количества хэштегов
  pristine.addValidator(
    hashtagInput,
    validateHashtagCount,
    getHashtagCountError,
    2,
    true
  );

  // Валидация формата хэштегов
  pristine.addValidator(
    hashtagInput,
    validateHashtagFormat,
    getHashtagFormatError,
    1,
    true
  );

  // Валидация уникальности хэштегов
  pristine.addValidator(
    hashtagInput,
    validateHashtagUniqueness,
    getHashtagUniquenessError,
    3,
    true
  );

  // Валидация комментария
  pristine.addValidator(
    commentInput,
    validateDescription,
    getDescriptionError
  );
};

// Открытие формы
const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  hashtagInput.addEventListener('keydown', stopPropagation);
  commentInput.addEventListener('keydown', stopPropagation);
};

// Закрытие формы
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  hashtagInput.removeEventListener('keydown', stopPropagation);
  commentInput.removeEventListener('keydown', stopPropagation);

  // Сброс формы
  uploadInput.value = '';
  uploadForm.reset();

  if (pristine) {
    pristine.reset();
  }
};

// Обработка отправки формы
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

// Основная функция инициализации
const initFormValidation = () => {
  if (!uploadInput || !uploadOverlay) {
    return;
  }

  // Инициализация Pristine
  initValidation();

  // Открытие формы при выборе файла
  uploadInput.addEventListener('change', () => {
    if (uploadInput.files && uploadInput.files[0]) {
      openUploadForm();
    }
  });

  // Закрытие формы
  uploadCancel.addEventListener('click', closeUploadForm);

  // Закрытие по Esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
      closeUploadForm();
    }
  });

  // Отправка формы
  uploadForm.addEventListener('submit', onFormSubmit);
};

export { initFormValidation };
