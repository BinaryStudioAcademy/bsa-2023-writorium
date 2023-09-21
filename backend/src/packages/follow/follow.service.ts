import { type FollowRepository } from '~/packages/follow/follow.repository.js';

import { type UserFollowResponseDto } from './libs/types/types.js';

class FollowService {
  private followRepository: FollowRepository;

  public constructor(followRepository: FollowRepository) {
    this.followRepository = followRepository;
  }

  public async toggleFollowAuthor({
    userId,
    authorId,
  }: {
    userId: number;
    authorId: number;
  }): Promise<UserFollowResponseDto> {
    await this.followRepository.toggleFollowAuthor({
      userId,
      authorId,
    });

    return await this.getAuthorFollowersCountAndStatus({
      userId,
      authorId,
    });
  }

  public async getAuthorFollowersCountAndStatus({
    userId,
    authorId,
  }: {
    userId: number;
    authorId: number;
  }): Promise<UserFollowResponseDto> {
    return await this.followRepository.getAuthorFollowersCountAndStatus({
      userId,
      authorId,
    });
  }
}

export { FollowService };
