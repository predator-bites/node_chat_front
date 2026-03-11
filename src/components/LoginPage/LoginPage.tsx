import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../shared/Button';
import client from '../../client';
import { Loader } from '../shared/Loader';
import { storageManager } from '../../utils/storage';
import { handleApiError } from '../../utils/errorHandler';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();

  // #region handlers
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (typeof name !== 'string' || name.length < 2) {
        setError('Name is required');
        return;
      }

      const data = await client.createUser(name);

      storageManager.setUser(data.id, data.name);

      navigate({
        pathname: '/chats',
        search: params.toString(),
      });
    } catch (err) {
      const errorMessage = handleApiError(err);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [name, navigate, params]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }

    setName(event.target.value);
  };
  // #endregion

  // #region functions
  const cb = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return;
      }

      onSubmit();
    },
    [onSubmit],
  );
  // #endregion

  // #region useEffects
  useEffect(() => {
    const { userId, userName } = storageManager.getUser();

    if (!userId || !userName) {
      storageManager.cleanUser();

      return;
    }

    navigate('/chats');
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('keypress', cb);

    return () => document.removeEventListener('keypress', cb);
  }, [onSubmit, cb]);
  // #endregion

  return (
    <div className="page__content loginContainer">
      <div className="login">
        {isLoading && <Loader className="loader--primary" />}

        <label htmlFor="name" className="input__title">
          Enter your name
        </label>
        <div className="input">
          <input
            value={name}
            id="name"
            type="text"
            onChange={onChange}
            className="input__place input--small"
            placeholder="Enter your name"
          ></input>

          {error && <span className="input__error">{error}</span>}
        </div>

        <Button type="wide" classname="login__button" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
