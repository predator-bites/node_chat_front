import { configureStore } from '@reduxjs/toolkit';
import { reducer as messagesReducer } from '../features/Messages';
import { reducer as roomsReducer } from '../features/Rooms';
import { reducer as roomsMessagesReducer } from '../features/RoomsMessages';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    rooms: roomsReducer,
    roomsMessages: roomsMessagesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppSelector = ReturnType<typeof store.getState>;
