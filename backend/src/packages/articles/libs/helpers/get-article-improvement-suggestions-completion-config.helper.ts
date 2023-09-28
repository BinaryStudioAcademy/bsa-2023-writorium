import { type CompletionConfig } from '~/libs/packages/openai/libs/types/types.js';

const getArticleImprovementSuggestionsCompletionConfig = (
  text: string,
): CompletionConfig => {
  return {
    prompt: `You'll be given a html markup of article and your task is to identify some points that you would suggest to change to make the article better. Ignore any html related issues - focus on article content. Provide the result in JSON format as an array of objects where each object has keys: title (title of suggestion), description (description of suggestion), and priority (can be 1, 2, or 3, it identifies the importance of suggestion, 1 - lowest priority, 3 - highest priority).Provide no more than 5 suggestions. Here's the article: ${text}`,
  };
};

export { getArticleImprovementSuggestionsCompletionConfig };
