const ArticlePromptCompletionConfig = {
  MESSAGE:
    'Your task is to generate a prompt for writing an article which will consist of the following components: genre, character, prop, situation and setting. You should generate a unique random value no longer than 4 words for each, so all of the elements create a consise and interesting article concept. Genre is any possible category of writing or literature. Provide your output in json format with the keys: genre, prop, character, situation, setting.',
  TEMPERATURE: 1.5,
} as const;

export { ArticlePromptCompletionConfig };
