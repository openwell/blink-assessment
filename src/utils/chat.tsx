import { ChatType, MessageType } from '../types/chat';
export const sortMessages = (messageList: MessageType[]) => {
    return messageList.sort((a: any, b: any) => {
      if (a.last_updated > b.last_updated) return 1;
      if (a.last_updated < b.last_updated) return -1;
      return 0;
    });
  };
  export const sortChat = (chatList: ChatType[]) => {
    return chatList.sort((a: any, b: any) => {
      if (a.last_updated > b.last_updated) return -1;
      if (a.last_updated < b.last_updated) return 1;
      return 0;
    });
  };