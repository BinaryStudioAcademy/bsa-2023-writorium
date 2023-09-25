const parseJSONSafely = <T>(jsonString: string): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
};

export { parseJSONSafely };
