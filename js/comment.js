import { getRandEl, getRandInt } from './util.js';
import { NAMES, MESSAGES } from './constants.js';

const generateCommId = (() => {
  let lastId = 0;
  return () => ++lastId;
})();

export const createComm = () => {
  const messageCount = getRandInt(1, 2);
  const messages = Array.from({ length: messageCount }, () => getRandEl(MESSAGES));

  return {
    id: generateCommId(),
    avatar: `img/avatar-${getRandInt(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandEl(NAMES)
  };
};
