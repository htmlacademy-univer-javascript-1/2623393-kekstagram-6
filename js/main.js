const NAMES = ['Ари', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Еркен', 'Алексей', 'Ольга', 'Иван', 'Наталья'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Закат на море',
  'Горный пейзаж',
  'Уютный вечер с чаем',
  'Прогулка по осеннему лесу',
  'Архитектура старого города',
  'Путешествие',
  'Тихое утро в деревне',
  'Городские огни ночью',
  'Природа',
  'Прекрасный рассвет'
];

const getRandEl = (array) => array[Math.floor(Math.random() * array.length)];

const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createIdGen = () => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return lastId;
  };
};

const generateCommId = createIdGen();

const createComm = () => {
  const messageCount = getRandInt(1, 2);
  const messages = Array.from({ length: messageCount }, () => getRandEl(MESSAGES));

  return {
    id: generateCommId(),
    avatar: `img/avatar-${getRandInt(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandEl(NAMES)
  };
};

const createObject = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandEl(DESCRIPTIONS),
  likes: getRandInt(15, 200),
  comments: Array.from({ length: getRandInt(0, 30) }, createComm)
});

const generateObjects = () => Array.from({ length: 25 }, (_, index) => createObject(index + 1));
