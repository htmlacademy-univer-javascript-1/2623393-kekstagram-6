import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const closeSuccessModal = () => {
  const successModal = document.querySelector('.success');
  if (successModal) {
    successModal.remove();
  }
};

const closeErrorModal = () => {
  const errorModal = document.querySelector('.error');
  if (errorModal) {
    errorModal.remove();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const successModal = document.querySelector('.success');
    const errorModal = document.querySelector('.error');

    if (successModal) {
      closeSuccessModal();
    } else if (errorModal) {
      closeErrorModal();
    }
  }
};

const onModalClick = (evt) => {
  if (evt.target.classList.contains('success')) {
    closeSuccessModal();
  } else if (evt.target.classList.contains('error')) {
    closeErrorModal();
  }
};

const onSuccessButtonClick = () => {
  closeSuccessModal();
};

const onErrorButtonClick = () => {
  closeErrorModal();
};

// фугкция для отображения
const showModal = (template, closeButtonClickHandler, closeModalHandler) => {
  const modalElement = template.content.cloneNode(true);
  document.body.appendChild(modalElement);

  const modal = document.querySelector(`.${template.id}`);
  const closeButton = modal.querySelector('button');

  closeButton.addEventListener('click', closeButtonClickHandler);
  modal.addEventListener('click', closeModalHandler);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showModal(successTemplate, onSuccessButtonClick, onModalClick);
};

const showErrorMessage = () => {
  showModal(errorTemplate, onErrorButtonClick, onModalClick);
};

// функция для ошибки загрузки данных красным и висит сверху над версткой
const showDataError = () => {
  const errorElement = document.createElement('div');
  errorElement.className = 'data-error';
  errorElement.textContent = 'Ошибка загрузки данных';
  document.body.appendChild(errorElement);
};

export { showSuccessMessage, showErrorMessage, showDataError};
