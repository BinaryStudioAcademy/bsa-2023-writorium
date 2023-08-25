import { PromptCategory } from '../enums/enums.js';

const { CHARACTER, SITUATION, SETTING, PROP, GENRE } = PromptCategory;

const categoryPrompts = {
  [CHARACTER]: ['Girl', 'Detective', '', 'Alien', 'Wizard', 'Superhero'],
  [SITUATION]: [
    'Street',
    'Cracks a code',
    'Time travel',
    '',
    'Is trapped',
    'Runs away',
  ],
  [SETTING]: [
    '',
    'Ancient castle',
    'Outer space',
    'Underwater city',
    'Parisian cafe',
    'High-tech laboratory',
  ],
  [PROP]: [
    'Red hair',
    'Mysterious key',
    'Magic potion',
    'Old map',
    'Dark secret',
    '',
  ],
  [GENRE]: [
    'Fiction',
    'Fantasy',
    'Mystery',
    'Science fiction',
    'Romance',
    'Adventure',
  ],
};

export { categoryPrompts };
