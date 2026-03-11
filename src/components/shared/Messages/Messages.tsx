/* eslint-disable react-hooks/set-state-in-effect */
import type React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Message } from '../Message/Message';
import { useEffect, useRef, useState } from 'react';
import { getNewParams } from '../../../utils/workWithSearchParams';
import { storageManager } from '../../../utils/storage';

export const Messages: React.FC = () => {
  const roomsMessages = useAppSelector((state) => state.roomsMessages);

  const [params, setSearchParams] = useSearchParams();
  const messagesElement = useRef<HTMLDivElement | null>(null);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  const { userName: name } = storageManager.getUser();
  const roomId = params.get('roomId') || '';

  const roomData = roomsMessages.data[activeRoomIndex];
  const messages = roomData?.messages ?? [];

  // #region useEffects
  useEffect(() => {
    if (!roomId) {
      setActiveRoomIndex(0);
    }

    const targetRoomIndex = roomsMessages.data.findIndex(
      (elem) => elem.roomId === roomId,
    );

    if (targetRoomIndex === -1) {
      setSearchParams((cur) =>
        getNewParams([{ key: 'roomId', value: null }], cur),
      );
      return;
    }

    setActiveRoomIndex(targetRoomIndex);
  }, [roomId, roomsMessages.data, setSearchParams]);

  useEffect(() => {
    messagesElement.current?.scrollTo({
      top: messagesElement.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length]);
  // #endregion

  return (
    <div className="messages" ref={messagesElement}>
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} user={name || ''} />
      ))}
    </div>
  );
};
