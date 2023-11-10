import useSWR from 'swr';
import { chatData } from '../data/chat';
import { ChatType } from '../types/chat';

export default function useChat() {
  const fetcher = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(chatData);
      }, 5000);
    });
  };

  const { data, error, isLoading } = useSWR(
    'https://file.notion.so/f/f/8db718dd-d6b5-4ce7-b057-c933de3a46a6/26c014cc-3f16-47dd-8438-921e5b1bd543/code_test_data.json?id=9bdc2a55-6e1e-4a16-9080-560873f1ad78&table=block&spaceId=8db718dd-d6b5-4ce7-b057-c933de3a46a6&expirationTimestamp=1699718400000&signature=N_-8KSSP3-VwBpJ1NO9MogMF3_EkFot7Ree8xAY9HH4',
    fetcher
  );
  const dataClone = data as ChatType[];
  return { data: dataClone , error, isLoading };
}
