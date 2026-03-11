import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { actions as roomsActions } from './Rooms';

const initialState: { messages: Message[] } = { messages: [] };

export const { reducer, actions } = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Message[]>) => {
      state.messages = payload;
    },
    push: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(roomsActions.delete, (state, { payload }) => {
      state.messages = state.messages.filter(
        (msg) => msg.roomId !== payload.id,
      );
    });
  },
});
