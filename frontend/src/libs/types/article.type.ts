import { type TagType } from './tag.type.js';

type ArticleType = {
  title: string;
  text: string;
  tags: TagType[];
  autor: {
    firstName: string;
    lastName: string;
  };
};

export { type ArticleType };
