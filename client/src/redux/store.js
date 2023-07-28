import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './features/teamSlice';
import usersReducer  from './features/usersSlice'
import userReducer  from './features/userSlice'

const store = configureStore({
  reducer: {
    team: teamReducer,
    users:usersReducer,
    user:userReducer
  },
});

export default store;
