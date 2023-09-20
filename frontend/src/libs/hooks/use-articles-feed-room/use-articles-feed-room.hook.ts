import { useEffect } from 'react';

import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import {
  ArticleSocketEvent,
  type ArticleSocketEventPayload,
} from '~/packages/articles/articles.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { useSocketNamespace } from '../use-socket-namespace/use-socket-namespace.hook.js';

const { NEW_ARTICLE } = ArticleSocketEvent;

const useArticlesFeedRoom = (): void => {
  const socketReference = useSocketNamespace(
    SocketNamespace.ARTICLES,
    SocketRoom.ARTICLES_FEED,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = socketReference.current;

    socket?.on(
      NEW_ARTICLE,
      (newArticle: ArticleSocketEventPayload[typeof NEW_ARTICLE]) => {
        void dispatch(articleActions.addArticle(newArticle));
      },
    );
  }, [dispatch, socketReference]);
};

export { useArticlesFeedRoom };
