export const getRandEl = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createIdGen = () => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return lastId;
  };
};
