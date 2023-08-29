import { type REACTIONS_LIST } from '../constants.js';

type Reaction = (typeof REACTIONS_LIST)[number]['iconName'];

export { type Reaction };
