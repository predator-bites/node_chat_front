import React from 'react';
import { Icon } from '../Icon';

interface Props {
  showStatus: boolean;
  setIsChanging: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
}

export const RoomButtons: React.FC<Props> = ({
  showStatus,
  setIsChanging,
  onDelete,
}) => {
  if (!showStatus) {
    return;
  }

  return (
    <div className="room__buttonContainer">
      <button
        className="button room__button"
        onClick={() => setIsChanging(true)}
      >
        <Icon iconSlug="Pencil" size="small" />
      </button>

      <button className="button room__button" onClick={onDelete}>
        <Icon iconSlug="X" size="small" />
      </button>
    </div>
  );
};
