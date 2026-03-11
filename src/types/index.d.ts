interface ErrorMessage {
  for?: string;
  message: string;
}
interface ErrorObject {
  errors: ErrorMessage[];
}

type RawMessage = {
  userId: string;
  text: string;
  roomId?: string;
};

type Message = {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  roomId?: string;
};

type Room = {
  id: string;
  title: string;
};

type User = {
  id: string;
  name: string;
};

type RawRoom = Pick<Room, 'title'>;

type PartialRawRoom = Partial<RawRoom>;

type RoomsMessages = {
  roomId: string;
  messages: Message[];
};

type Update = {
  type: 'new' | 'update' | 'delete';
  to: 'rooms' | 'messages';
  data: Room | Message;
}