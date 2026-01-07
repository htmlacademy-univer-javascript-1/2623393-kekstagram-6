const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleContainer = document.querySelector('.img-upload__scale');
const preview = document.querySelector('.img-upload__preview img');

const scaleValue = scaleContainer ? scaleContainer.querySelector('.scale__control--value') : null;
const scaleSmallerBtn = scaleContainer ? scaleContainer.querySelector('.scale__control--smaller') : null;
const scaleBiggerBtn = scaleContainer ? scaleContainer.querySelector('.scale__control--bigger') : null;
const imagePreview = preview;

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
  if (!scaleValue || !scaleSmallerBtn || !scaleBiggerBtn || !imagePreview) {
    return;
  }

  resetScale();

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
};

export { initScale, destroyScale, resetScale };
