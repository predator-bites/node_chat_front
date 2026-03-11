import { createRoot } from 'react-dom/client';
import { Root } from './Root.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
