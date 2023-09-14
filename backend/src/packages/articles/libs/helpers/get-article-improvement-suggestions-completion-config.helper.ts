import { type CompletionConfig } from '~/libs/packages/openai/libs/types/types.js';

const getArticleImprovementSuggestionsCompletionConfig = (
  text: string,
): CompletionConfig => {
  return {
    prompt: `You'll be given a text of an article and your task is to identify some points that you would suggest to change to make the article better. Provide the result in JSON format as an array of objects where each object has keys: title (title of suggestion), description (detailed description of suggestion), and importance (can be 1, 2, or 3, it identifies the priority of suggestion, 1 - lowest priority, 3 - highest priority). Here's the text ${text}`,
  };
};

export { getArticleImprovementSuggestionsCompletionConfig };
