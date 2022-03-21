import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface WildfireDataInterface {
  id: string | null;
  title: string | null;
  date: string | null;
  coordinate: CoordinateInterface | null;
}

interface State {
  loading: boolean;
  error: boolean;
  wildfires: WildfireDataInterface[];
}

const initialState: State = {
  loading: false,
  error: false,
  wildfires: [],
};

export const wildfireSlice = createSlice({
  name: "wildfire",
  initialState,
  reducers: {
    loadWildFire: (state) => {
      state.loading = true;
      state.error = false;
      state.wildfires = [];
    },
    loadWildFireSuccess: (
      state,
      action: PayloadAction<WildfireDataInterface[]>
    ) => {
      state.loading = false;
      state.error = false;
      state.wildfires = action.payload;
    },

    loadWildFireFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.wildfires = [];
    },
  },
});

export const { loadWildFire, loadWildFireSuccess, loadWildFireFailed } =
  wildfireSlice.actions;

export const selectWildfire = (state: RootState) => state.wildfire.wildfires;

export default wildfireSlice.reducer;
