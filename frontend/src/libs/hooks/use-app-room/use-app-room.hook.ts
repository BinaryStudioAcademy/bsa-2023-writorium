import { configureString } from '~/libs/helpers/helpers.js';
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

const useApplicationRoom = (userId: number | null): void => {
  const dispatch = useAppDispatch();

  const applicationSocketReference = useSocketNamespace(
    SocketNamespace.APPLICATION,
    configureString(SocketRoom.USER_ID, {
      id: String(userId ?? 'guest'),
    }),
  );

  useEffect(() => {
    const applicationSocket = applicationSocketReference.current;

    applicationSocket?.on(
      NEW_COMMENT,
      (comment: CommentsSocketEventPayload[typeof NEW_COMMENT]) => {
        void dispatch(articleActions.addComment(comment));
      },
    );
  }, [dispatch, applicationSocketReference, userId]);
};

export { useApplicationRoom };
