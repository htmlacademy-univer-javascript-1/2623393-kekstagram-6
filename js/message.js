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
  if (evt.key === 'Escape') {
    const successModal = document.querySelector('.success');
    const errorModal = document.querySelector('.error');

    if (successModal) {
      evt.stopPropagation();
      closeSuccessModal();
    } else if (errorModal) {
      evt.stopPropagation();
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

const showSuccessMessage = () => {
  const successElement = successTemplate.content.cloneNode(true);
  document.body.appendChild(successElement);

  const successModal = document.querySelector('.success');
  const successButton = successModal.querySelector('.success__button');

  successButton.addEventListener('click', onSuccessButtonClick);
  successModal.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showErrorMessage = () => {
  const errorElement = errorTemplate.content.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorModal = document.querySelector('.error');
  const errorButton = errorModal.querySelector('.error__button');

  errorButton.addEventListener('click', onErrorButtonClick);
  errorModal.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showSuccessMessage, showErrorMessage };
