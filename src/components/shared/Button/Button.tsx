import type React from 'react';
import cn from 'classnames';

interface Props {
  children: React.ReactNode;
  type: 'wide' | 'square';
  classname?: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  children,
  type,
  classname = '',
  onClick,
}) => {
  const classNames = cn('button', classname, {
    'button--wide': type === 'wide',
    'button--square': type === 'square',
  });

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};
