import { type Namespace } from 'socket.io';
import { type DefaultEventsMap } from 'socket.io/dist/typed-events';

import {
  SocketNamespace,
  SocketRoom,
  type SocketService,
} from '~/libs/packages/socket/socket.js';

import { type FollowRepository } from '../follow/follow.repository.js';
import { ArticleSocketEvent } from './libs/enums/enums.js';
import {
  type ArticleSocketEventPayload,
  type ArticleWithCountsResponseDto,
} from './libs/types/types.js';

const { NEW_ARTICLE } = ArticleSocketEvent;

interface ArticlesServerToClientEvents {
  [NEW_ARTICLE]: (
    payload: ArticleSocketEventPayload[typeof NEW_ARTICLE],
  ) => void;
}

type Constructor = {
  socketService: SocketService;
  followRepository: FollowRepository;
};

class ArticleSocketService {
  private followRepository: FollowRepository;
  private socketService: SocketService;

  public constructor({ followRepository, socketService }: Constructor) {
    this.socketService = socketService;
    this.followRepository = followRepository;
  }

  private get namespace(): Namespace<
    DefaultEventsMap,
    ArticlesServerToClientEvents
  > {
    return this.socketService.io.of(SocketNamespace.ARTICLES);
  }

  public async handleNewArticle(
    article: ArticleWithCountsResponseDto,
  ): Promise<void> {
    const sockets = await this.namespace
      .in(SocketRoom.ARTICLES_FEED)
      .fetchSockets();

    const authorFollowers = await this.followRepository.findAuthorFollowers(
      article.userId,
    );

    const authorFollowersIds = new Set(
      authorFollowers.map(({ userId }) => userId),
    );

    for (const socket of sockets) {
      const socketUserId = Number(socket.handshake.query.userId);

      this.namespace.to(SocketRoom.ARTICLES_FEED).emit('new-article', {
        article,
        isByFollowingAuthor: authorFollowersIds.has(socketUserId),
      });
    }
  }
}

export { ArticleSocketService };
