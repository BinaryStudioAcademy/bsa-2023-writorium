import { useEffect } from 'react';

import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import {
  type ArticleReactionsSocketEventPayload,
  type ArticleSocketEventPayload,
} from '~/packages/articles/articles.js';
import {
  ArticleReactionsSocketEvent,
  ArticleSocketEvent,
} from '~/packages/articles/articles.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { useSocketNamespace } from '../use-socket-namespace/use-socket-namespace.hook.js';

const { NEW_ARTICLE } = ArticleSocketEvent;
const { NEW_REACTION } = ArticleReactionsSocketEvent;

const useArticlesFeedRoom = (): void => {
  const dispatch = useAppDispatch();

  const articlesSocketReference = useSocketNamespace(
    SocketNamespace.ARTICLES,
    SocketRoom.ARTICLES_FEED,
  );

  const reactionsSocketReference = useSocketNamespace(
    SocketNamespace.REACTIONS,
    SocketRoom.ARTICLES_FEED,
  );

  useEffect(() => {
    const articlesSocket = articlesSocketReference.current;
    const reactionsSocket = reactionsSocketReference.current;

    articlesSocket?.on(
      NEW_ARTICLE,
      (newArticle: ArticleSocketEventPayload[typeof NEW_ARTICLE]) => {
        void dispatch(articleActions.addArticle(newArticle));
      },
    );

    reactionsSocket?.on(
      NEW_REACTION,
      (reaction: ArticleReactionsSocketEventPayload[typeof NEW_REACTION]) => {
        void dispatch(articleActions.addReactionToArticlesFeed(reaction));
      },
    );
  }, [dispatch, articlesSocketReference, reactionsSocketReference]);
};

export { useArticlesFeedRoom };
