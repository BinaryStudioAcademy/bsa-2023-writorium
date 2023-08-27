import { type TagType } from './types.js';

type ArticleType = {
  title: string;
  text: string;
  tags: TagType[];
};

export { type ArticleType };
