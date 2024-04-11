export interface IListMessage {
  _id: string;
  sender: ISender;
  content: string;
  chat: IChat;
  readBy: any[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISender {
  _id: string;
  email_tel: string;
  information: Information;
}

interface Information {
  firstName: string;
  lastName: string;
  avatar_url: string[];
}

export interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: string[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  latestMessage: string;
}
