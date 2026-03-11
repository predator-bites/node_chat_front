import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import client from '../../../client';

import { actions as roomsActions } from '../../../features/Rooms';
import { actions as messagesActions } from '../../../features/Messages';

const wssLink = 'wss://node-chat-g1d3.onrender.com';

export const useSignForUpdates = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = new WebSocket(wssLink);

    const cb = (ev: MessageEvent) => {
      const updateObject: Update = JSON.parse(ev.data);

      switch (updateObject.type) {
        case 'new': {
          if (updateObject.to === 'messages') {
            dispatch(messagesActions.push(updateObject.data as Message));

            break;
          }

          dispatch(roomsActions.push(updateObject.data as Room));
          break;
        }
        case 'update': {
          dispatch(roomsActions.update(updateObject.data as Room));

          break;
        }
        case 'delete': {
          dispatch(roomsActions.delete(updateObject.data as Room));

          break;
        }
      }
    };

    socket.addEventListener('message', cb);

    return () => {
      socket.removeEventListener('message', cb);
    };
  }, [dispatch]);
};

export const loadData = () => {
  return client.loadData();
};
