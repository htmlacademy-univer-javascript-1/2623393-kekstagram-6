const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

// Функция показа сообщения об успехе
const showSuccessMessage = () => {
  const successElement = successTemplate.content.cloneNode(true);
  document.body.appendChild(successElement);

  const successModal = document.querySelector('.success');
  const successButton = successModal.querySelector('.success__button');

  // Закрытие по клику на кнопку
  successButton.addEventListener('click', () => {
    successModal.remove();
  });

  // Закрытие по клику вне сообщения
  successModal.addEventListener('click', (evt) => {
    if (evt.target === successModal) {
      successModal.remove();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successModal.remove();
    }
  });
};

// Функция показа сообщения об ошибке
const showErrorMessage = () => {
  const errorElement = errorTemplate.content.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorModal = document.querySelector('.error');
  const errorButton = errorModal.querySelector('.error__button');

  // Закрытие по клику на кнопку
  errorButton.addEventListener('click', () => {
    errorModal.remove();
  });

  // Закрытие по клику вне сообщения
  errorModal.addEventListener('click', (evt) => {
    if (evt.target === errorModal) {
      errorModal.remove();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      errorModal.remove();
    }
  });
};

export { showSuccessMessage, showErrorMessage };
