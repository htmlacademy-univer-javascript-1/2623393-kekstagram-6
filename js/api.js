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

export { sendData };
