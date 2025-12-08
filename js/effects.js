// effects.js
const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    filter: '',
    unit: '',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};

const DEFAULT_EFFECT = 'none';

const effectsContainer = document.querySelector('.img-upload__effects');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevelValue = effectLevelContainer.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');

let currentEffect = DEFAULT_EFFECT;
let slider = null;

const applyEffect = (value) => {
  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    return;
  }

  const { filter, unit } = EFFECTS[currentEffect];
  imagePreview.style.filter = `${filter}(${value}${unit})`;
};

const toggleSliderVisibility = () => {
  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
  } else {
    effectLevelContainer.classList.remove('hidden');
  }
};

const initSlider = () => {
  if (typeof noUiSlider === 'undefined') {
    return;
  }

  slider = noUiSlider.create(effectLevelSlider, {
    range: {
      min: EFFECTS[currentEffect].min,
      max: EFFECTS[currentEffect].max,
    },
    start: EFFECTS[currentEffect].max,
    step: EFFECTS[currentEffect].step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  slider.on('update', () => {
    const value = slider.get();
    effectLevelValue.value = value;
    applyEffect(value);
  });
};

const updateSlider = () => {
  if (slider) {
    slider.updateOptions({
      range: {
        min: EFFECTS[currentEffect].min,
        max: EFFECTS[currentEffect].max,
      },
      start: EFFECTS[currentEffect].max,
      step: EFFECTS[currentEffect].step,
    });
  }
};

const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    currentEffect = evt.target.value;

    const maxValue = EFFECTS[currentEffect].max;
    effectLevelValue.value = maxValue;

    updateSlider();
    applyEffect(maxValue);
    toggleSliderVisibility();
  }
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;

  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  if (slider) {
    const maxValue = EFFECTS[currentEffect].max;
    effectLevelValue.value = maxValue;
    updateSlider();
    applyEffect(maxValue);
    toggleSliderVisibility();
  }
};

const initEffects = () => {
  if (typeof noUiSlider === 'undefined') {
    return;
  }

  initSlider();
  toggleSliderVisibility();
  effectsContainer.addEventListener('change', onEffectChange);

  const maxValue = EFFECTS[currentEffect].max;
  effectLevelValue.value = maxValue;
  applyEffect(maxValue);
};

const destroyEffects = () => {
  if (slider) {
    slider.destroy();
    slider = null;
  }
  effectsContainer.removeEventListener('change', onEffectChange);
  resetEffects();
};

export { initEffects, destroyEffects, resetEffects };
