import { configureString } from '~/libs/helpers/helpers.js';
import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import {
  ArticleReactionsSocketEvent,
  type ArticleReactionsSocketEventPayload,
} from '~/packages/articles/articles.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { useEffect } from '../react/react.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { useSocketNamespace } from '../use-socket-namespace/use-socket-namespace.hook.js';

const { NEW_REACTION } = ArticleReactionsSocketEvent;

const useArticleRoom = (articleId: number): void => {
  const dispatch = useAppDispatch();

  const reactionsSocketReference = useSocketNamespace(
    SocketNamespace.REACTIONS,
    configureString(SocketRoom.ARTICLE_$ID, { id: String(articleId) }),
  );

  useEffect(() => {
    const reactionsSocket = reactionsSocketReference.current;

    reactionsSocket?.on(
      NEW_REACTION,
      (reaction: ArticleReactionsSocketEventPayload[typeof NEW_REACTION]) => {
        void dispatch(articleActions.addReactionToArticleView(reaction));
      },
    );
  }, [dispatch, reactionsSocketReference]);
};

export { useArticleRoom };
