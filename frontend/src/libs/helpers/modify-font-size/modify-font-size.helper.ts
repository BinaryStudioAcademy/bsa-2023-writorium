const modifyFontSize = (text: string, newFontSize: string): string => {
  return text.replaceAll(
    /style="font-size:[^"]*"/g,
    `style="font-size: ${newFontSize}"`,
  );
};

export { modifyFontSize };
