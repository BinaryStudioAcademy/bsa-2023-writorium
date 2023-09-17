import { type CompletionConfig } from '~/libs/packages/openai/libs/types/completion-config.type.js';

const getArticleReadTimeCompletionConfig = (
  text: string,
): CompletionConfig => ({
  prompt: `You will be provided with a text of an article, and your task is to estimate how much time (in minutes) does the regular person need to read it. Provide your output in json format with key 'readTime' and number of minutes as value. Here is the text: ${text}.`,
});

export { getArticleReadTimeCompletionConfig };
