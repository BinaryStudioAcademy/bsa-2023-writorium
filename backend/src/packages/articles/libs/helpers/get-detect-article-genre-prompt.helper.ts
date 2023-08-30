const getDetectArticleGenrePrompt = (text: string): string => {
  return `You will be provided with a text of an article, and your task is to extract a list of possible genres of that article. Provide your output in json format as an array of objects with keys name and key, where name is a readble name of the genre and key - a short snake cased representation of genre name. Place the most relevant genre at the 0 index. Here is the text: ${text}.`;
};

export { getDetectArticleGenrePrompt };
