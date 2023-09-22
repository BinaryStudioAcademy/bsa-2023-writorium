import { FontSizeConfig } from '../constants/config.constant.js';

const decrementFontSize = (fontSize: number): number => {
  const newFontSize = fontSize - FontSizeConfig.CHANGE_STEP;
  return newFontSize < FontSizeConfig.MIN_FONT_SIZE
    ? FontSizeConfig.MIN_FONT_SIZE
    : newFontSize;
};

export { decrementFontSize };