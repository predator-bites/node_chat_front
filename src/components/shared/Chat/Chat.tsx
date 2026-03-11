/* eslint-disable react-hooks/set-state-in-effect */
import type React from 'react';
import { Messages } from '../Messages/Messages';
import { useCallback, useEffect, useState } from 'react';
import { Icon } from '../Icon';
import client from '../../../client';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Button } from '../Button';
import { getNewParams } from '../../../utils/workWithSearchParams';
import { storageManager } from '../../../utils/storage';

export const Chat: React.FC = () => {
  const [text, setText] = useState('');
  const [params, setParams] = useSearchParams();
  const { rooms } = useAppSelector((state) => state.rooms);
  const [room, setRoom] = useState<Room | null>(null);

  const roomId = params.get('roomId');
  const { userId } = storageManager.getUser();

  // #region handlers
  const handleTextChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };

  const onSubmit = useCallback(() => {
    const preparedText = text.trim();

    if (!preparedText || !userId) {
      return;
    }

    setText('');

    client.sendMessage(userId, preparedText, roomId);
  }, [text, userId, setText, roomId]);
  // #endregion

  // #region useEffects
  useEffect(() => {
    if (!roomId) {
      setRoom(rooms[0]);
      return;
    }

    const foundRoom = rooms.find((room) => room.id === roomId);

    if (!foundRoom) {
      setParams((cur) => getNewParams([{ key: 'roomId', value: null }], cur));
    }

    setRoom(foundRoom || rooms[0]);
  }, [roomId, rooms, params, setParams]);

  useEffect(() => {
    const cb = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return;
      }

      onSubmit();
    };

    document.addEventListener('keypress', cb);

    return () => {
      document.removeEventListener('keypress', cb);
    };
  }, [onSubmit]);
  // #endregion

  return (
    <div className="chat">
      <div className="chat__data">
        <h1 className="chat__title">{room?.title}</h1>
      </div>

      <Messages />

      <div className="chat__inputContainer">
        <input
          type="text"
          className="chat__input"
          placeholder="Enter your message"
          value={text}
          onChange={handleTextChange}
        />

        <Button type="square" onClick={onSubmit}>
          <Icon iconSlug="SendHorizontal" size="big" className="chat__button" />
        </Button>
      </div>
    </div>
  );
};
