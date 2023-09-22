import { FontSizeConfig } from '../constants/constants.js';

const incrementFontSize = (fontSize: number): number => {
  const newFontSize = fontSize + FontSizeConfig.CHANGE_STEP;
  return newFontSize > FontSizeConfig.MAX_FONT_SIZE
    ? FontSizeConfig.MAX_FONT_SIZE
    : newFontSize;
};

export { incrementFontSize };
