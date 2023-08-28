import { type TagType } from './tag.type.js';

type ArticleType = {
  title: string;
  text: string;
  tags: TagType[];
};

export { type ArticleType };
