import type React from 'react';
import { Icon } from '../Icon';
import { useCallback, useState } from 'react';
import client from '../../../client';
import { Loader } from '../Loader';
import { NewRoom, type NewRoomData } from '../NewRoom';

interface Props {
  room: Room;
  onClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    roomId: string,
  ) => void;
  onDelete: (roomId: string) => Promise<void>;
}

export const Room: React.FC<Props> = ({ room, onClick, onDelete }) => {
  const [newTitle, setNewTitle] = useState(room.title);
  const [isChanging, setIsChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // #region
  const onRoomDelete = () => {
    setIsLoading(true);

    onDelete(room.id).finally(() => {
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
    if (!newTitle || !room.id) {
      return;
    }

    setIsLoading(true);

    client.renameRoom(newTitle, room.id).finally(() => {
      setIsLoading(false);
      setIsChanging(false);
    });
  }, [newTitle, room.id]);
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

  return (
    <div className="room" onClick={(event) => onClick(event, room.id)}>
      {isLoading && <Loader className="loader--primary" />}
      <h2 className="room__title">{room.title}</h2>
      <div className="room__buttonContainer">
        {room.id && (
          <button
            className="button room__button"
            onClick={() => setIsChanging(true)}
          >
            <Icon iconSlug="Pencil" size="small" />
          </button>
        )}

        {room.id && (
          <button className="button room__button" onClick={onRoomDelete}>
            <Icon iconSlug="X" size="small" />
          </button>
        )}
      </div>
    </div>
  );
};
