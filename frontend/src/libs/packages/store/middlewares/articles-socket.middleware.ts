import { type Middleware } from '@reduxjs/toolkit';

import {
  ArticleSocketEvent,
  type ArticleSocketEventPayload,
} from '~/packages/articles/articles.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { socket, SocketNamespace } from '../../socket/socket.js';
import { type RootReducer } from '../store.package.js';

const articlesSocketInstance = socket.getInstance(SocketNamespace.ARTICLES);

const { NEW_ARTICLE } = ArticleSocketEvent;

const articlesSocketMiddleware: Middleware<object, RootReducer> = ({
  dispatch,
}) => {
  articlesSocketInstance.on(
    NEW_ARTICLE,
    (newArticle: ArticleSocketEventPayload[typeof NEW_ARTICLE]) => {
      void dispatch(
        // @ts-expect-error couldn't fix error regarding incompatible AnyAction...
        articleActions.addArticle(newArticle),
      );
    },
  );

  return (next) => (action) => {
    next(action);
  };
};

export { articlesSocketMiddleware };
