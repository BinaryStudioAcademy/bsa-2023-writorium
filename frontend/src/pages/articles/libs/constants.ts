import { type ReactionsType, type TagType } from './types/types.js';

const MOCKED_TAGS: TagType[] = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'CODE' },
  { id: 3, name: 'Humor' },
  { id: 4, name: 'Work' },
  { id: 5, name: 'Tech' },
];

const MOCKED_REACTIONS: ReactionsType = {
  comments: '540',
  views: '367K',
  likes: '36K',
  dislikes: '18K',
};

export { MOCKED_REACTIONS, MOCKED_TAGS };
