const writeTextInClipboard = async (
  text: string,
): Promise<null | undefined> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    return null;
  }
};

export { writeTextInClipboard };
