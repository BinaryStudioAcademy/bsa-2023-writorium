import { type TagType } from './tag.type.js';

type ArticleType = {
  id: number;
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
