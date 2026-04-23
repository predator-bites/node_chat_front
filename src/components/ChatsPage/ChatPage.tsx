/* eslint-disable react-hooks/set-state-in-effect */
import type React from 'react';
import { Chat } from '../shared/Chat/Chat';
import { loadData, useSignForUpdates } from '../shared/LoadData/LoadData';
import { Rooms } from '../shared/Rooms';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { actions as roomsActions } from '../../features/Rooms';
import { actions as messagesActions } from '../../features/Messages';
import { Loader } from '../shared/Loader';
import { storageManager } from '../../utils/storage';

const ChatsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();

  useSignForUpdates();

  useEffect(() => {
    const { userId, userName } = storageManager.getUser();

    if (!userId || !userName) {
      navigate({
        pathname: '/login',
        search: params.toString(),
      });
    }
  }, [navigate, params]);

  useEffect(() => {
    setIsLoading(true);
    loadData()
      .then((data) => {
        dispatch(roomsActions.set(data.rooms));
        dispatch(messagesActions.set(data.messages));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, setIsLoading]);

  return (
    <div className="page__content chatsContainer">
      <Loader
        className="loader--primary loader--transparent"
        isLoading={isLoading}
      />
      <Rooms />
      <Chat />
    </div>
  );
};

export default ChatsPage;
