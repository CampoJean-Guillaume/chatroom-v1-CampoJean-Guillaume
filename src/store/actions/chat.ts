import { createAction } from '@reduxjs/toolkit';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_USER = 'ADD_USER';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';

export const addMessage = createAction(ADD_MESSAGE);
export const addUser = createAction(ADD_USER);
export const deleteMessage = createAction<string>(DELETE_MESSAGE);
export const fetchMessages = createAction(FETCH_MESSAGES);
export const editMessage = createAction(EDIT_MESSAGE, (id, content) => ({
  payload: { id, content },
}));
