import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  rooms: Room[];
}

const generalRoom = { id: '', title: 'general', author: null };

const initialState: InitialState = {
  rooms: [generalRoom],
};

export const { reducer, actions } = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Room[]>) => {
      state.rooms = [generalRoom, ...payload];
    },

    update: (state, { payload }: PayloadAction<Room>) => {
      state.rooms = state.rooms.map((room) => {
        if (room.id !== payload.id) {
          return room;
        }

        return payload;
      });
    },

    delete: (state, { payload }: PayloadAction<Room>) => {
      state.rooms = state.rooms.filter((room) => room.id !== payload.id);
    },

    push: (state, { payload }: PayloadAction<Room>) => {
      const foundRoom = state.rooms.find((room) => room.id === payload.id);

      if (!foundRoom) {
        state.rooms.push(payload);
      }
    },
  },
});
