import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../redux/auth/AuthApi.jsx';

const initialState = {
  user: { name: '', email: '', avatar: '' },
  token: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,

  reducers: {
    registerUser(state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },

    logInUser(state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.isLoggedIn = true;
    },
    logOutUser(state) {
      state.user = { name: '', email: '', avatar: '' };
      state.token = null;
      state.isLoggedIn = false;
    },

    fetchUser(state, action) {
      state.user = action.payload.data;
      state.isLoggedIn = true;
    },

    updateUserAvatar(state, action) {
      state.user.avatar = action.payload.data.avatar;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.getUserById.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const {
  logInUser,
  registerUser,
  logOutUser,
  fetchUser,
  updateUserAvatar,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
