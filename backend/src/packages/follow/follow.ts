import { FollowModel } from './follow.model.js';
import { FollowRepository } from './follow.repository.js';
import { FollowService } from './follow.service.js';

const followRepository = new FollowRepository(FollowModel);
const followService = new FollowService(followRepository);

export { followRepository, followService };
export { FollowRepository } from './follow.repository.js';
export { FollowService } from './follow.service.js';
