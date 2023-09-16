const ARTICLE_PROMPT_COMPLETION_MESSAGE =
  'Your task is to generate a prompt for writing an article which will consist of the following components: genre, character, prop, situation and setting. You should generate a unique random value for each, so all of the elements create a consise and interesting article concept. Provide your output in json format with the keys: genre, prop, character, situation, setting.';

const ARTICLE_PROMPT_COMPLETION_TEMPERATURE = 1.5;

export {
  ARTICLE_PROMPT_COMPLETION_MESSAGE,
  ARTICLE_PROMPT_COMPLETION_TEMPERATURE,
};