import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { CoordinateInterface } from "./wildfire";

export interface SinglePointInterface {
  date: string | null;
  coordinate: CoordinateInterface | null;
}

export interface StormDataInterface {
  id: string | null;
  title: string | null;
  line: SinglePointInterface[] | null;
}

interface State {
  loading: boolean;
  error: boolean;
  storms: StormDataInterface[];
}

const initialState: State = {
  loading: false,
  error: false,
  storms: [],
};

export const stormSlice = createSlice({
  name: "storm",
  initialState,
  reducers: {
    loadStorms: (state) => {
      state.loading = true;
      state.error = false;
      state.storms = [];
    },
    loadStormsSuccess: (state, action: PayloadAction<StormDataInterface[]>) => {
      state.loading = false;
      state.error = false;
      state.storms = action.payload;
    },

    loadStormsFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.storms = [];
    },
  },
});

export const { loadStorms, loadStormsSuccess, loadStormsFailed } =
  stormSlice.actions;

export const selectStorm = (state: RootState) => state.storm.storms;

export default stormSlice.reducer;
