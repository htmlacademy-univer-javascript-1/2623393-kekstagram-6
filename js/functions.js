function checkStrLength(string, number) {
  return string.length <= number;
}
// Cтрока короче 20 символов
checkStrLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStrLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStrLength('проверяемая строка', 10); // false

function checkPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/\s/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');

  return cleanedStr === reversedStr;
}

// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс');  // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true


function extractDig(input) {
  if (typeof input === 'number') {
    input = Math.abs(input).toString();
  }

  if (typeof input !== 'string') {
    return NaN;
  }

  const dig = input.match(/\d/g);

  if (!dig) {
    return NaN;
  }

  const result = parseInt(dig.join(''), 10);

  return result;
}

// Тесты
extractDig('2023 год'); // 2023
extractDig('ECMAScript 2022'); // 2022
extractDig('1 кефир, 0.5 батона'); // 105
extractDig('агент 007');           // 7
extractDig('а я томат');           // NaN

// Дополнительные тесты с числами
extractDig(2023); // 2023
extractDig(-1); // 1
extractDig(1.5); // 15
