import { configureString } from '~/libs/helpers/helpers.js';
import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import {
  ArticleReactionsSocketEvent,
  type ArticleReactionsSocketEventPayload,
} from '~/packages/articles/articles.js';
import {
  CommentsSocketEvent,
  type CommentsSocketEventPayload,
} from '~/packages/comments/comments.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { useEffect } from '../react/react.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { useSocketNamespace } from '../use-socket-namespace/use-socket-namespace.hook.js';

const { NEW_COMMENT } = CommentsSocketEvent;
const { NEW_REACTION } = ArticleReactionsSocketEvent;

const useArticleRoom = (articleId: number): void => {
  const dispatch = useAppDispatch();
  const commentsSocketReference = useSocketNamespace(
    SocketNamespace.COMMENTS,
    configureString(SocketRoom.ARTICLE_$ID, { id: String(articleId) }),
  );
  const reactionsSocketReference = useSocketNamespace(
    SocketNamespace.REACTIONS,
    configureString(SocketRoom.ARTICLE_$ID, { id: String(articleId) }),
  );

  useEffect(() => {
    const commentsSocket = commentsSocketReference.current;
    const reactionsSocket = reactionsSocketReference.current;

    commentsSocket?.on(
      NEW_COMMENT,
      (comment: CommentsSocketEventPayload[typeof NEW_COMMENT]) => {
        void dispatch(articleActions.addComment(comment));
      },
    );

    reactionsSocket?.on(
      NEW_REACTION,
      (reaction: ArticleReactionsSocketEventPayload[typeof NEW_REACTION]) => {
        void dispatch(articleActions.addReactionToArticleView(reaction));
      },
    );
  }, [dispatch, commentsSocketReference, reactionsSocketReference]);
};

export { useArticleRoom };
