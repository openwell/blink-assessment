import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  color: #03390f;
`;

export const ChatContainer = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  border: 1px solid grey;
  height: 700px;
  display: flex;
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

export const SideBar = styled.ul`
  max-width: 300px;
  height: 100%;
  border-right: 1px solid grey;
  background-color: #fff;
  padding: 0px;
  margin: 0px;
  @media (max-width: 768px) {
    width: 30%;
  }
`;

export const ConversationWrapper = styled.li<{ index: number }>`
  text-align: center;
  list-style: none;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid grey;
  padding: 10px;
  box-sizing: border-box;
  &:hover {
    background-color: #f2f2f2;
  }
  ${(props) =>
    props.index === 0 &&
    `
    background-color: #f2f2f2;
  `}
`;

export const ConversationName = styled.p`
  font-size: 14px;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F6F7F9;
  @media (max-width: 768px) {
    width: 70%;
  }
`;

export const MessageAreaWrapper = styled.div`
  position: relative;
  height: calc(100% - 110px);
  padding: 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 425px) {
    height: calc(100% - 150px);
  }
`;
export const MessageList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const MessageWrapper = styled.div`
  height: auto;
  padding: 5px;
  background: white;
  margin: 5px 0px;
  width: fit-content;
  box-shadow: 0 1px 0.5px #0b141a21;
  list-style: none;
  cursor: pointer;
`;

export const Message = styled.p`
  font-size: 16px;
  text-wrap: wrap;
`;

export const DateText = styled.p`
  font-size: 12px;
  text-wrap: wrap;
`;

export const ReplyWrapper = styled.form`
  width: calc(100% - 20px);
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid grey;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 20%;
  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  width: 75%;
  @media (max-width: 425px) {
    width: 100%;
  }
`;



export const LoaderWrapper = styled.div`
  margin: 0 auto;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
`;
export const LoaderMessage = styled.h2`
  font-size: 16px;
  text-align: center;
`;

export const ErrorWrapper = styled.div`
  margin: 0 auto;
  max-width: 400px;
  background-color: #f35858;
  padding: 20px;
  margin-top: 20px;
`;
export const ErrorMessage = styled.h2`
  font-size: 16px;
  text-align: center;
  color: #fff;
`;

