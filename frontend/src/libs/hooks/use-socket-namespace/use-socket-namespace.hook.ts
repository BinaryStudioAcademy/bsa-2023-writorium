import { type MutableRefObject } from 'react';
import { type Socket } from 'socket.io-client';

import {
  type SocketNamespace,
  type SocketRoom,
} from '~/libs/packages/socket/socket.js';
import { socket, SocketEvent } from '~/libs/packages/socket/socket.js';
import { type ValueOf } from '~/libs/types/types.js';

import { useAppSelector, useEffect, useReference } from '../hooks.js';

const useSocketNamespace = (
  namespace: ValueOf<typeof SocketNamespace>,
  roomId: ValueOf<typeof SocketRoom>,
): MutableRefObject<Socket | null> => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const socketInstanceReference = useReference<Socket | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socketInstance = socket.getInstance(namespace, userId);
    socketInstanceReference.current = socketInstance;
    socketInstance.emit(SocketEvent.JOIN_ROOM, roomId);

    return () => {
      socketInstance.emit(SocketEvent.LEAVE_ROOM, roomId);
      socketInstance.disconnect();
      socketInstanceReference.current = null;
    };
  }, [roomId, userId, namespace, socketInstanceReference]);

  return socketInstanceReference;
};

export { useSocketNamespace };
