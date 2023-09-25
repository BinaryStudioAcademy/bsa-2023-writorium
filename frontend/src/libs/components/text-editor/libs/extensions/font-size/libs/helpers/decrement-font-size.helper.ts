import { FontSizeConfig } from '../enums/enums.js';

const decrementFontSize = (fontSize: number): number => {
  const newFontSize = fontSize - FontSizeConfig.CHANGE_STEP;
  return newFontSize < FontSizeConfig.MIN_FONT_SIZE
    ? FontSizeConfig.MIN_FONT_SIZE
    : newFontSize;
};

export { decrementFontSize };
