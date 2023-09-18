import { type SocketNamespace } from '~/libs/packages/socket/socket.js';
import { socket, SocketEvent } from '~/libs/packages/socket/socket.js';
import { type ValueOf } from '~/libs/types/types.js';

import { useAppSelector, useEffect, useReference } from '../hooks.js';

const useSocketNamespace = (name: ValueOf<typeof SocketNamespace>): void => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const socketInstanceReference = useReference(socket.getInstance(name));

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socketInstance = socketInstanceReference.current;

    socketInstance.emit(SocketEvent.JOIN_ROOM, userId);

    return () => {
      socketInstance.emit(SocketEvent.LEAVE_ROOM, userId);
    };
  }, [userId, socketInstanceReference]);
};

export { useSocketNamespace };
