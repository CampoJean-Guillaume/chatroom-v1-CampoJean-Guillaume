import { createReducer } from '@reduxjs/toolkit';
import { formVisibility, login, logout } from '../actions/login';

const initialState = {
  email: '',
  password: '',
  isLogged: false,
  isVisible: false,
};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    // Ajouter un cas pour la connexion
    .addCase(login, (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLogged = true;
    })
    // Ajouter un cas pour la déconnexion
    .addCase(logout, (state) => {
      state.email = '';
      state.password = '';
      state.isLogged = false;
      console.log('logout');
    })
    // Ajouter un cas pour la visibilité
    .addCase(formVisibility, (state) => {
      state.isVisible = !state.isVisible;
      console.log('visibility');
    });
});

export default loginReducer;
