import type React from 'react';
import { useCallback, useState } from 'react';
import client from '../../../client';
import { useAppSelector } from '../../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import { getNewParams } from '../../../utils/workWithSearchParams';
import { Room } from '../Room/Room';
import { NewRoom, type NewRoomData } from '../NewRoom';

export const Rooms: React.FC = () => {
  const [_, setSearchParams] = useSearchParams();
  const [newTitle, setNewTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const data = useAppSelector((state) => state.rooms);

  // #region handlers
  const onCreate = () => {
    setIsCreating(true);
  };

  const onBlur = () => {
    setNewTitle('');
    setIsCreating(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const onSubmit = useCallback(() => {
    if (!newTitle.trim()) {
      return;
    }

    return client.createRoom(newTitle);
  }, [newTitle]);

  const onClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    roomId: string,
  ) => {
    const element = event.target as HTMLElement;

    if (
      element.tagName &&
      element.tagName !== 'DIV' &&
      element.tagName !== 'H2'
    ) {
      return;
    }

    setParam('roomId', roomId);
  };

  const onDelete = (roomId: string) => {
    return client.deleteRoom(roomId);
  };
  // #endregion

  // #region functions
  const setParam = (key: string, value: string | null) => {
    setSearchParams((cur) => {
      return getNewParams([{ key, value }], cur);
    });
  };

  const cb = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key !== 'Enter') {
        return;
      }

      if (!newTitle) {
        return;
      }

      setIsLoading(true);

      onSubmit()
        ?.then(() => {
          setIsCreating(false);
          setNewTitle('');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [newTitle, onSubmit],
  );
  // #endregion

  // #region data
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
  // #endregion

  return (
    <div className="rooms">
      <button className="rooms__panel" onClick={onCreate}>
        <span className="rooms__createTitle">Create a room</span>
      </button>

      {isCreating && <NewRoom newRoomData={newRoomData} />}

      {data.rooms.map((room) => (
        <Room key={room.id} room={room} onClick={onClick} onDelete={onDelete} />
      ))}
    </div>
  );
};
