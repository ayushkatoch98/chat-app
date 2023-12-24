import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: "",
  email: "",
  jwt: "",
  isSignedIn: false,
  _id: "",
  image: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state._id = action.payload._id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.jwt = action.payload.jwt;
        state.isSignedIn = action.payload.jwt != "";
        state.image = action.payload.image;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer