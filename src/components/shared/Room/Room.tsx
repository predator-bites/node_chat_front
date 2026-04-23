import type React from 'react';
import { useCallback, useState } from 'react';
import client from '../../../client';
import { Loader } from '../Loader';
import { NewRoom, type NewRoomData } from '../NewRoom';
import type { AxiosResponse } from 'axios';
import { storageManager } from '../../../utils/storage';
import { RoomButtons } from './RoomButtons';

interface Props {
  room: Room;
  onClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    roomId: string,
  ) => void;
  onDelete: (roomId: string, userId: string) => Promise<AxiosResponse>;
}

export const Room: React.FC<Props> = ({ room, onClick, onDelete }) => {
  const [newTitle, setNewTitle] = useState(room.title);
  const [isChanging, setIsChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userId, userName } = storageManager.getUser();

  // #region
  const onRoomDelete = () => {
    if (!userId) {
      return;
    }
    setIsLoading(true);

    onDelete(room.id, userId).finally(() => {
      setIsLoading(false);
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const onBlur = () => {
    setIsChanging(false);
  };

  const onSubmit = useCallback(() => {
    if (!newTitle || !room.id || !userId) {
      return;
    }

    setIsLoading(true);

    client.renameRoom(newTitle, room.id, userId).finally(() => {
      setIsLoading(false);
      setIsChanging(false);
    });
  }, [newTitle, room.id, userId]);
  // #endregion

  const cb = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return;
      }

      if (!newTitle) {
        return;
      }

      onSubmit();
    },
    [onSubmit, newTitle],
  );

  const newRoomData: NewRoomData = {
    newTitle: newTitle,
    placeholder: 'Change name of the room',
    onChange: onChange,
    onBlur: onBlur,
    isLoading: isLoading,
    onSubmit: onSubmit,
    cb: cb,
    eventName: 'keypress',
  };

  if (isChanging) {
    return <NewRoom newRoomData={newRoomData} />;
  }

  const showStatus = Boolean(room.id && room.author === userName);

  return (
    <div className="room" onClick={(event) => onClick(event, room.id)}>
      <Loader className="loader--primary" isLoading={isLoading} />

      <h2 className="room__title">{room.title}</h2>

      <RoomButtons
        showStatus={showStatus}
        setIsChanging={setIsChanging}
        onDelete={onRoomDelete}
      />
    </div>
  );
};
