export const getRandEl = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createIdGen = () => {
  let lastId = 0;
  return () => {
    lastId += 1;
    return lastId;
  };
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};
