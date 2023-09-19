const FONT_SIZE_PATTERN = /([\d.]+)px/i;

const convertFontSizeToNumber = (
  styleValue: string | null | undefined,
): number | null => {
  if (!styleValue) {
    return null;
  }
  const matches = styleValue.match(FONT_SIZE_PATTERN);
  if (!matches) {
    return null;
  }
  const value = Number(matches[1]);
  if (!value) {
    return null;
  }
  return value;
};

export { convertFontSizeToNumber };
