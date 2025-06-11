import { createSlice } from "@reduxjs/toolkit";
import type { InfoCard } from "../types/types";

interface CreateCardState {
  cards: InfoCard[];
}

const initialState: CreateCardState = {
  cards: [],
};

const createCardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    createCard(state, action) {
      state.cards.push(action.payload);
    },
  },
});
export const { createCard } = createCardSlice.actions;
export default createCardSlice.reducer;
