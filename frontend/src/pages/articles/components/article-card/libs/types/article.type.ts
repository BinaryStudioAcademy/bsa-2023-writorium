import { type TagType } from './types.js';

type ArticleType = {
  publishedAt: string;
  timeSincePublication: string;
  title: string;
  text: string;
  comments: string;
  views: string;
  likes: string;
  dislikes: string;
  tags: TagType[];
};

export { type ArticleType };
