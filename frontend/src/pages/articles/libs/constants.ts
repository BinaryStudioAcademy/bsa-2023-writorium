import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { type ArticleType, type TagType } from './types/types.js';

const MOCKED_USER: UserAuthResponseDto = {
  id: 7,
  email: 'nolanaris@gmail.com',
  firstName: 'Nolan',
  lastName: 'Saris',
  avatarUrl: '',
  avatarId: null,
};

const MOCKED_TEXT: string = `The developer technology landscape changes all the time as new tools
  and technologies are introduced. After having lots of interviews and
  reading through countless job descriptions on job boards I think this
  is a great modern tech stack for JavaScript developers in 2021.`;

const MOCKED_TAGS: TagType[] = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'CODE' },
  { id: 3, name: 'Humor' },
  { id: 4, name: 'Work' },
  { id: 5, name: 'Tech' },
];

const MOCKED_ARTICLE: ArticleType = {
  id: 1,
  publishedAt: 'May 28',
  timeSincePublication: '7 min read',
  title: 'Modern Full-Stack Developer Tech Stack 2021',
  text: MOCKED_TEXT,
  comments: '540',
  views: '367K',
  likes: '36K',
  dislikes: '18K',
  tags: MOCKED_TAGS,
};

const MOCKED_ARTICLES: ArticleType[] = Array.from({ length: 3 })
  .fill(MOCKED_ARTICLE)
  .map((article, index) => ({ ...(article as ArticleType), id: index }));

export { MOCKED_ARTICLES, MOCKED_USER };
