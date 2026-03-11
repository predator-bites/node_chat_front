import type React from 'react';
import { useEffect } from 'react';
import { Loader } from '../Loader';

export interface NewRoomData {
  newTitle: string;
  placeholder: string;
  isLoading: boolean;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  cb: (event: KeyboardEvent) => void;
  eventName: 'keypress';
}
interface Props {
  newRoomData: NewRoomData;
}

export const NewRoom: React.FC<Props> = ({ newRoomData }) => {
  const {
    newTitle,
    placeholder,
    isLoading,
    onBlur,
    onChange,
    onSubmit,
    cb,
    eventName,
  } = newRoomData;

  useEffect(() => {
    if (!cb || !eventName) {
      return;
    }

    document.addEventListener('keypress', cb);

    return () => {
      document.removeEventListener('keypress', cb);
    };
  }, [cb, eventName]);

  return (
    <div className="room">
      <Loader className="loader--primary" isLoading={isLoading} />

      <input
        type="text"
        className="input__place room__input"
        placeholder={placeholder}
        value={newTitle}
        onBlur={onBlur}
        onChange={onChange}
        onSubmit={onSubmit}
        autoFocus
      />
    </div>
  );
};
