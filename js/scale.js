const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let scaleValue = null;
let scaleSmallerBtn = null;
let scaleBiggerBtn = null;
let imagePreview = null;

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  if (!scaleValue || !imagePreview)
  {
    return;
  }
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
  const scaleContainer = document.querySelector('.img-upload__scale');
  const preview = document.querySelector('.img-upload__preview img');

  if (!scaleContainer || !preview) {
    return;
  }

  scaleValue = scaleContainer.querySelector('.scale__control--value');
  scaleSmallerBtn = scaleContainer.querySelector('.scale__control--smaller');
  scaleBiggerBtn = scaleContainer.querySelector('.scale__control--bigger');
  imagePreview = preview;

  if (!scaleValue || !scaleSmallerBtn || !scaleBiggerBtn) {
    return;
  }

  updateScale();
  scaleSmallerBtn.addEventListener('click', onScaleSmallerClick);
  scaleBiggerBtn.addEventListener('click', onScaleBiggerClick);
};

const destroyScale = () => {
  if (scaleSmallerBtn) {
    scaleSmallerBtn.removeEventListener('click', onScaleSmallerClick);
  }
  if (scaleBiggerBtn) {
    scaleBiggerBtn.removeEventListener('click', onScaleBiggerClick);
  }
  resetScale();

  scaleValue = null;
  scaleSmallerBtn = null;
  scaleBiggerBtn = null;
  imagePreview = null;
};

export { initScale, destroyScale, resetScale };
