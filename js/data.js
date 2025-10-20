import { getRandEl, getRandInt } from './util.js';
import { createComm } from './comment.js';
import { DESCRIPTIONS } from './constants.js';

const createObject = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandEl(DESCRIPTIONS),
  likes: getRandInt(15, 200),
  comments: Array.from({ length: getRandInt(0, 30) }, createComm)
});

export const generateObjects = () => Array.from({ length: 25 }, (_, index) => createObject(index + 1));
