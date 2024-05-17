import { createSlice } from "@reduxjs/toolkit";

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    latest: null,
    history: {},
  },

  reducers: {
    addLatest: (state, action) => {
      state.latest = action.payload;
    },
    addHistory: (state) => {
      state.history = action.payload;
    },
  },
});

export const { addLatest, addHistory } = chatbotSlice.actions;
export default chatbotSlice.reducer;
