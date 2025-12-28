const API_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

// Функция отправки данных
const sendData = async (body) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  }

  return response.json();
};

// Функция загрузки данных с сервера
const loadData = async () => {
  const response = await fetch(`${API_URL}/data`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить данные. Попробуйте ещё раз');
  }

  return response.json();
};

export { sendData, loadData };
