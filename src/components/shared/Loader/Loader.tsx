import classNames from 'classnames';
import { LoaderIcon } from 'lucide-react';
import React from 'react';

export const Loader: React.FC<{ className?: string, isLoading?: boolean }> = ({
  className = '',
  isLoading,
}) => {
  if (!isLoading) {
    return;
  }

  return (
    <div className={classNames('page__loader', className)}>
      <LoaderIcon className={classNames('loader')} />
    </div>
  );
};
