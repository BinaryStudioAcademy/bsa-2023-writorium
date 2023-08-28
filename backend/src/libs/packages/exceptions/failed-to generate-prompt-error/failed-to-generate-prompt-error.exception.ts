class FailedToGeneratePromptError extends Error {
  public constructor() {
    super('Failed to generate prompt');
  }
}

export { FailedToGeneratePromptError };
