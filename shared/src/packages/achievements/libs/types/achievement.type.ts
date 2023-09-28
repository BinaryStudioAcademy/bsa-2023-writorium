import { type AchievementDescription } from './achievement-description.type.js';

type Achievement = {
  id: number;
  key: string;
  name: string;
  description: AchievementDescription;
  breakpoint: number;
  referenceTable: string;
};

export { type Achievement };
