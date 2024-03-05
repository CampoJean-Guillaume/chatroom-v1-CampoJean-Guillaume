import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/redux-hook';
import Message from '../Message/Message';

const MessageList = () => {
  const listMessages = useAppSelector((state) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [listMessages]);

  return (
    <div className='overflow-auto pb-5 text-gray-950 dark:text-white' style={{ maxHeight: '90vh' }}>
      {listMessages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
