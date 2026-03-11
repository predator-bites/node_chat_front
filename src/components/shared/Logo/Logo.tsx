import type React from 'react';
import { Icon } from '../Icon/Icon';
import cn from 'classnames';

interface Props {
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<Props> = ({ className = '', onClick }) => {
  return (
    <div className={cn('logo', className)} onClick={onClick}>
      <Icon iconSlug="MessageSquare" size="big" />
    </div>
  );
};
