const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleContainer = document.querySelector('.img-upload__scale');
const scaleValue = scaleContainer.querySelector('.scale__control--value');
const scaleSmallerBtn = scaleContainer.querySelector('.scale__control--smaller');
const scaleBiggerBtn = scaleContainer.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  scaleValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const onScaleSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
};

const initScale = () => {
  updateScale();
  scaleSmallerBtn.addEventListener('click', onScaleSmallerClick);
  scaleBiggerBtn.addEventListener('click', onScaleBiggerClick);
};

const destroyScale = () => {
  scaleSmallerBtn.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerBtn.removeEventListener('click', onScaleBiggerClick);
  resetScale();
};

export { initScale, destroyScale, resetScale };
