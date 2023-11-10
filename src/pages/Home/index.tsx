import React, { useState, useEffect, useRef } from 'react';
import {
  ChatContainer,
  SideBar,
  Main,
  ReplyWrapper,
  InputWrapper,
  ButtonWrapper,
  MessageWrapper,
  Message,
  ConversationWrapper,
  ConversationName,
  DateText,
  MessageAreaWrapper,
  Container,
  Title,
  LoaderWrapper,
  LoaderMessage,
  ErrorWrapper,
  ErrorMessage,
  MessageList,
} from './Styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { dateFormatter } from '../../utils/date';
import { sortMessages, sortChat } from '../../utils/chat';
import { MessageType, ChatType } from '../../types/chat';
import useChat from '../../hooks/useChat';

function Home() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useChat();

  const [chatList, setChatList] = useState([] as ChatType[]);
  const [currentConversationId, setCurrentConversationId] = useState('');
  const [currentMessages, setCurrentMessages] = useState([] as MessageType[]);
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editMessageId, setEditMessageId] = useState('');

  const changeConversationHandler = (id: string) => {
    setCurrentConversationId(id);
    setCurrentMessages(
      chatList?.find((chat) => chat?.id === id)?.messages ?? []
    );
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  useEffect(() => {
    if (data?.length === 0) return;
    if (data?.length > 0) {
      setChatList(data);
      setCurrentConversationId(sortChat(data)?.[0].id);
      setCurrentMessages(sortChat(data)?.[0].messages);
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
    return () => {};
  }, [data]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = event.currentTarget.message.value;
    if (editMode) {
      const newMessage = {
        id: editMessageId,
        text: message,
        last_updated: new Date().toISOString(),
      };
      const newChatList = chatList.map((chat) => {
        if (chat.id === currentConversationId) {
          return {
            ...chat,
            messages: chat.messages.map((message) => {
              if (message.id === editMessageId) {
                return newMessage
              }
              return message
            }),
            last_updated: newMessage.last_updated,
          };
        }
        return chat;
      });
      setChatList(newChatList);
      setCurrentMessages(newChatList.find((chat) => chat?.id === currentConversationId)?.messages ?? []);
      setEditMode(false);
      setEditValue('');
      setEditMessageId('')
    } else {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        last_updated: new Date().toISOString(),
      };
      const newChatList = chatList.map((chat) => {
        if (chat.id === currentConversationId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            last_updated: newMessage.last_updated,
          };
        }
        return chat;
      });
      setChatList(newChatList);
      setCurrentMessages([...currentMessages, newMessage]);
    }

    event.currentTarget.reset();

    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollTo({
      left: 0,
      top: bottomRef?.current?.scrollHeight,
      behavior: 'smooth',
    });
  };

  const editMessageHandler = (id: string) => {
    setEditMode(true);
    const message = currentMessages.find(
      (message) => message.id === id
    ) as MessageType;
    setEditValue(message?.text);
    setEditMessageId(id)
  };

  return (
    <Container>
      {error && (
        <ErrorWrapper>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorWrapper>
      )}

      <Title>Conversations</Title>
      {isLoading ? (
        <LoaderWrapper>
          <LoaderMessage>Loading...</LoaderMessage>
        </LoaderWrapper>
      ) : (
        <ChatContainer>
          <SideBar aria-label="conversation list">
            {sortChat(chatList).map((chat, index) => (
              <ConversationWrapper
                key={chat.id}
                index={index}
                onClick={() => changeConversationHandler(chat.id)}
                aria-label="conversation item"
                aria-selected={
                  currentConversationId === chat.id ? 'true' : 'false'
                }
                tabIndex={currentConversationId === chat.id ? 0 : -1}
              >
                <ConversationName>{chat.name}</ConversationName>
              </ConversationWrapper>
            ))}
          </SideBar>
          <Main>
            <MessageAreaWrapper>
              <MessageList ref={bottomRef} aria-label="chat list">
                {currentConversationId &&
                  sortMessages(currentMessages).map(
                    ({ text, last_updated, id }) => (
                      <MessageWrapper
                        key={id}
                        aria-label="chat item"
                        onClick={() =>
                          editMessageHandler(id)
                        }
                      >
                        <DateText>{dateFormatter(last_updated)}</DateText>
                        <Message>{text}</Message>
                      </MessageWrapper>
                    )
                  )}
              </MessageList>
            </MessageAreaWrapper>
            <ReplyWrapper onSubmit={submitHandler}>
              <InputWrapper>
                <Input placeholder="Type a message" defaultValue={editValue}/>
              </InputWrapper>

              <ButtonWrapper>
                <Button text="Send" editMode={editMode} />
              </ButtonWrapper>
            </ReplyWrapper>
          </Main>
        </ChatContainer>
      )}
    </Container>
  );
}

export default Home;
