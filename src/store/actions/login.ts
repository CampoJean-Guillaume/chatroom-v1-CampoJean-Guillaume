import { createAction } from '@reduxjs/toolkit';

// Types d'actions
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const FORM_VISIBILITY = 'FORM_VISIBILITY';

// Actions
export const login = createAction(LOGIN, (email, password) => ({
  payload: { email, password },
}));
export const logout = createAction(LOGOUT);
export const formVisibility = createAction(FORM_VISIBILITY);
