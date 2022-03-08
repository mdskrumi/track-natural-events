import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface Coordinate {
  longitude: number;
  latitude: number;
}

interface WildfireData {
  id: number | null;
  title: string | null;
  date: string | null;
  coordinate: Coordinate | null;
}

interface State {
  loading: boolean;
  error: boolean;
  wildfires: WildfireData[];
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
    loadWildFireSuccess: (state, action: PayloadAction<WildfireData[]>) => {
      console.log(action);
      state.loading = false;
      state.error = false;
      state.wildfires = action.payload;
    },

    loadWildFireFailed: (state, action: PayloadAction<number>) => {
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
