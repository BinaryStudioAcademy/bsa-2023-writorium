import { type CompletionConfig } from '~/libs/packages/openai/libs/types/types.js';

import { DETECT_ARTICLE_GENRE_COMPLETION_TEMPERATURE } from '../constants/constants.js';

const getDetectArticleGenreCompletionConfig = (
  text: string,
): CompletionConfig => ({
  temperature: DETECT_ARTICLE_GENRE_COMPLETION_TEMPERATURE,
  prompt: `You will be provided with a text of an article, and your task is to extract a list of possible genres of that article. Provide your output in json format as an array of objects with keys name and key, where name is a readble name of the genre and key - a short snake cased representation of genre name. Place the most relevant genre at the 0 index. Here is the text: ${text}.`,
});

export { getDetectArticleGenreCompletionConfig };
