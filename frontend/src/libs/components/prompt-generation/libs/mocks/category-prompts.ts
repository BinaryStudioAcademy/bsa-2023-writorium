import { PromptCategory } from '../enums/enums.js';

const categoryPrompts = {
  [PromptCategory.CHARACTER]: [
    'Girl',
    'Detective',
    '',
    'Alien',
    'Wizard',
    'Superhero',
  ],
  [PromptCategory.SITUATION]: [
    'Street',
    'Cracks a code',
    'Time travel',
    '',
    'Is trapped',
    'Runs away',
  ],
  [PromptCategory.SETTING]: [
    '',
    'Ancient castle',
    'Outer space',
    'Underwater city',
    'Parisian cafe',
    'High-tech laboratory',
  ],
  [PromptCategory.PROP]: [
    'Red hair',
    'Mysterious key',
    'Magic potion',
    'Old map',
    'Dark secret',
    '',
  ],
  [PromptCategory.GENRE]: [
    'Fiction',
    'Fantasy',
    'Mystery',
    'Science fiction',
    'Romance',
    'Adventure',
  ],
};

export { categoryPrompts };
