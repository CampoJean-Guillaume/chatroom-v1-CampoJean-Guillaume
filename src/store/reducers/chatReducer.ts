import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../@types';
import { addMessage, addUser, deleteMessage, editMessage, fetchMessages } from '../actions/chat';

// const initialState: AppState = {
//   messages: [
//     { date: '12:58', user: 'user1', content: 'Hello' },
//     { date: '12:58', user: 'user2', content: 'Hi' },
//   ],
//   users: [{ user1: 'Jean-Guillaume' }, { user2: 'user2' }],
// };

const initialState: AppState = {
  messages: [],
  users: [],
};
// Souscrire aux ajouts de nouveaux messages

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMessage, (state, action) => {
      if (action.payload) {
        state.messages.push(action.payload);
      }
    })
    .addCase(addUser, (state, action) => {
      if (action.payload) {
        state.users.push(action.payload);
      }
    })
    .addCase(deleteMessage, (state, action) => {
      state.messages = state.messages.filter((message) => message.id !== action.payload);
    })
    .addCase(fetchMessages, (state, action) => {
      if (action.payload) {
        state.messages = action.payload;
      }
    })
    .addCase(editMessage, (state, action) => {
      const message = state.messages.find((message) => message.id === action.payload.id);
      if (message) {
        message.content = action.payload.content;
      }
    });
});

export default chatReducer;
