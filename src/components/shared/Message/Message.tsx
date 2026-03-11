import classNames from 'classnames';
import type React from 'react';

interface Props {
  msg: Message;
  user: string;
}

export const Message: React.FC<Props> = ({ msg, user }) => {
  const date = new Date(msg.createdAt);

  const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}   ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  return (
    <div
      className={classNames('message', {
        'message--createdByUser': user === msg.author,
        'message--createdByOthers': user !== msg.author,
      })}
    >
      <span className="message__author">{msg.author}</span>
      <span className="message__text">{msg.text}</span>
      <span className="message__createdAt">{time}</span>
    </div>
  );
};
