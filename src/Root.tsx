import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { lazy, Suspense } from 'react';
import { Loader } from './components/shared/Loader';

const LoginPage = lazy(() => import('./components/LoginPage/LoginPage'));
const ChatsPage = lazy(() => import('./components/ChatsPage/ChatPage'));

export const Root = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/chats" element={<ChatsPage />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);
