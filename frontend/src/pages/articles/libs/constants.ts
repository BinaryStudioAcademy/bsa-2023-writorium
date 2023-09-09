import { type TagType } from './types/types.js';

const MOCKED_TAGS: TagType[] = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'CODE' },
  { id: 3, name: 'Humor' },
  { id: 4, name: 'Work' },
  { id: 5, name: 'Tech' },
];

const MOCKED_REACTIONS = {
  comments: '540',
  views: '367K',
};

export { MOCKED_REACTIONS, MOCKED_TAGS };
