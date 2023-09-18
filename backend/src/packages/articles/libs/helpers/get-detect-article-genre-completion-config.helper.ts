import { type CompletionConfig } from '~/libs/packages/openai/libs/types/types.js';
import { UNKNOWN_GENRE_KEY } from '~/packages/genres/genre.js';

const getDetectArticleGenreCompletionConfig = (
  text: string,
): CompletionConfig => ({
  prompt: `You will be provided with an html markup of an article, and your task is to extract a list of possible genres of that article. Provide your output in json format as an array of objects with keys name and key, where name is a readble name of the genre and key - a short snake cased representation of genre name. Place the most relevant genre at the 0 index. In case you can't indentify the genre put an object { key: "${UNKNOWN_GENRE_KEY}", name: "Unknown" } as the first item in resulting array. Here is the text: ${text}.`,
});

export { getDetectArticleGenreCompletionConfig };
