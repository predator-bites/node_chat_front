import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { actions as messagesActions } from './Messages';
import { actions as roomsActions } from './Rooms';
import { type WritableDraft } from 'immer';

const generalRoomsMessages = { roomId: '', messages: [] };
const initialState: { data: RoomsMessages[] } = {
  data: [generalRoomsMessages],
};

const findRoom = (roomId: string, roomsMsgs: RoomsMessages[]) => {
  return roomsMsgs.find((room) => room.roomId === roomId);
};

const upsertRoom = (room: Room, state: WritableDraft<RoomsMessages>[]) => {
  const existingRoom = findRoom(room.id, state);

  if (!existingRoom) {
    state.push({ roomId: room.id, messages: [] });
  }
};

export const { reducer, actions } = createSlice({
  name: 'roomsMessages',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<RoomsMessages[]>) => {
      state.data = [generalRoomsMessages, ...payload];
    },
    delete: (state, { payload: id }: PayloadAction<string>) => {
      if (!state) {
        return;
      }

      state.data = state.data.filter((data) => data.roomId !== id);
    },
    add: (state, { payload }: PayloadAction<RoomsMessages>) => {
      if (!state.data) {
        state.data = [payload];
        return;
      }

      state.data.push(payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(messagesActions.set, (state, { payload }) => {
      payload.forEach((msg) => {
        if (!msg.roomId) {
          const room = state.data[0];

          room.messages = [...room.messages, msg];
          return;
        }

        const room = findRoom(msg.roomId, state.data);

        if (!room) {
          state.data.push({ roomId: msg.roomId, messages: [msg] });
          return;
        }

        room.messages = [...room.messages, msg];
      });
    });
    builder.addCase(messagesActions.push, (state, { payload }) => {
      if (!payload.roomId) {
        state.data[0] = {
          roomId: state.data[0].roomId,
          messages: [...state.data[0].messages, payload],
        };

        return;
      }

      const room = findRoom(payload.roomId, state.data);

      if (!room) {
        state.data = [
          ...state.data,
          { roomId: payload.roomId, messages: [payload] },
        ];
        return;
      }

      room.messages = [...room.messages, payload];
    });
    builder.addCase(roomsActions.set, (state, { payload }) => {
      payload.forEach((room) => {
        upsertRoom(room, state.data);
      });
    });
    builder.addCase(roomsActions.push, (state, { payload }) => {
      upsertRoom(payload, state.data);
    });
    builder.addCase(roomsActions.delete, (state, { payload }) => {
      state.data = state.data.filter(
        (roomsMessages) => roomsMessages.roomId !== payload.id,
      );
    });
  },
});
