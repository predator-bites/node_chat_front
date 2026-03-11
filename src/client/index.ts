import axios from 'axios';

const BASE_URL = 'https://node-chat-g1d3.onrender.com';

const loadRooms = async () => {
  return axios.get(BASE_URL + '/rooms');
};

const loadMessages = async () => {
  return axios.get(BASE_URL + '/messages');
};

const sendMessage = async (
  userId: string,
  text: string,
  roomId?: string | null,
) => {
  const payload: RawMessage = { userId, text };

  if (roomId) {
    payload.roomId = roomId;
  }

  return axios.post(BASE_URL + '/messages', payload);
};

const createRoom = async (title: string) => {
  return axios.post(BASE_URL + '/rooms', { title });
};

const deleteRoom = async (roomId: string) => {
  return axios.delete(BASE_URL + `/rooms/${roomId}`);
};

const loadData = async () => {
  const { data: messagesData } = await loadMessages();
  const { data: roomsData } = await loadRooms();

  const rooms: Room[] = [...roomsData];
  const messages: Message[] = [...messagesData];

  return {
    rooms,
    messages,
  };
};

const renameRoom = async (newTitle: string, roomId: string) => {
  return axios.patch(`${BASE_URL}/rooms/${roomId}`, { title: newTitle });
};

const createUser = async (userName: string) => {
  const res = await axios.post(`${BASE_URL}/users`, {
    userName,
  });

  return res.data;
};

export default {
  loadRooms,
  loadMessages,
  loadData,
  sendMessage,
  createRoom,
  deleteRoom,
  renameRoom,
  createUser,
};
