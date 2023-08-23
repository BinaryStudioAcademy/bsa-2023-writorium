import { type FloatingLetter } from './types/floating-letter.type.js';

const AUTH_FORM_WRAPPER_FLOATING_LETTERS: FloatingLetter[] = [
  { key: 1, value: 'M', position: { left: -13, top: 80 } },
  { key: 2, value: 'R', position: { left: -15, bottom: 50 } },
  { key: 3, value: 'W', position: { right: 0, bottom: 130 } },
];

const HERO_FLOATING_LETTERS: FloatingLetter[] = [
  { key: 1, value: 'W', position: { left: 0, top: 80 } },
  { key: 2, value: 'R', position: { left: 0, bottom: 30 } },
  { key: 3, value: 'U', position: { right: 0, top: 50 } },
  { key: 4, value: 'T', position: { right: 0, bottom: 30 } },
];

export { AUTH_FORM_WRAPPER_FLOATING_LETTERS, HERO_FLOATING_LETTERS };
