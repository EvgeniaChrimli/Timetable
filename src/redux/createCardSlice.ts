import { createSlice } from "@reduxjs/toolkit";
import type { InfoCard } from "../types/types";

const savedCards = localStorage.getItem("cards");
const initialCards: InfoCard[] = savedCards ? JSON.parse(savedCards) : [];
interface CreateCardState {
  cards: InfoCard[];
}

const initialState: CreateCardState = {
  cards: initialCards,
};

const createCardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    createCard(state, action) {
      state.cards.push(action.payload);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
    removeCard(state, action) {
      state.cards = state.cards.filter((itm) => itm.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify(state.cards));
    },
  },
});
export const { createCard } = createCardSlice.actions;
export default createCardSlice.reducer;
