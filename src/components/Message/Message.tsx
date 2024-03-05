import { useState } from 'react';
import { deleteMessage } from '../../store/actions/chat';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';
import { editMessageApi, suprimMessage } from '../../supababase/supabase';

const Message = ({ message }: { message: any }) => {
  const user = useAppSelector((state) => state.chat.users);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const chatClass = message.user_id !== user[0].id ? 'chat-start' : 'chat-end';
  const userName = chatClass !== 'chat-start' ? user[0].name : user[1].name;

  const handleDelete = () => {
    suprimMessage(message.id);
    dispatch(deleteMessage(message.id)); // Pass message.id as an argument
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: { target: { value: any } }) => {
    setEditedContent(e.target.value);
  };

  const handleEditSubmit = async () => {
    await editMessageApi(message.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className={`chat ${chatClass} relative`}>
      <div className='chat-header mb-2 flex items-center'>
        {userName}
        <time className='text-xs opacity-50 ml-1'>{message.date}</time>
        <p className='text-xs opacity-50 ml-1 italic hover:cursor-pointer' onClick={handleDelete}>
          Supr /
        </p>
        {isEditing ? (
          <p className='text-xs  ml-1 bold hover:cursor-pointer' onClick={handleEditSubmit}>
            Enregistrer
          </p>
        ) : (
          <p className='text-xs opacity-50 ml-1 italic hover:cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
        )}
      </div>

      {isEditing ? (
        <input
          type='text'
          value={editedContent}
          onChange={handleEditChange}
          className='chat-bubble font-bold min-w-48 p-4 text-blue-600 bg-white dark:text-gray-950'
          autoFocus
        />
      ) : (
        <div className='chat-bubble font-bold min-w-48 p-4 text-blue-600 bg-white dark:text-gray-950'>{message.content}</div>
      )}
    </div>
  );
};

export default Message;
