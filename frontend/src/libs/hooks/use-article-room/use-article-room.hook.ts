import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import {
  CommentsSocketEvent,
  type CommentsSocketEventPayload,
} from '~/packages/comments/comments.js';
import { actions as articleActions } from '~/slices/articles/articles.js';

import { useEffect } from '../react/react.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { useSocketNamespace } from '../use-socket-namespace/use-socket-namespace.hook.js';

const { NEW_COMMENT } = CommentsSocketEvent;

const useArticleRoom = (articleId: number): void => {
  const dispatch = useAppDispatch();
  const socketReference = useSocketNamespace(
    SocketNamespace.COMMENTS,
    SocketRoom.ARTICLE_$ID.replace(':id', articleId.toString()),
  );

  useEffect(() => {
    const socket = socketReference.current;

    socket?.on(
      NEW_COMMENT,
      (newComment: CommentsSocketEventPayload[typeof NEW_COMMENT]) => {
        void dispatch(articleActions.addComment(newComment));
      },
    );
  }, [dispatch, socketReference]);
};

export { useArticleRoom };
