import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";



export interface VolcanoDataInterface {
  id: string | null;
  title: string | null;
  date: string | null;
  coordinate: CoordinateInterface | null;
}

interface State {
  loading: boolean;
  error: boolean;
  volcanoes: VolcanoDataInterface[];
}

const initialState: State = {
  loading: false,
  error: false,
  volcanoes: [],
};

export const volcanoSlice = createSlice({
  name: "volcanoes",
  initialState,
  reducers: {
    loadVolcanoes: (state) => {
      state.loading = true;
      state.error = false;
      state.volcanoes = [];
    },
    loadVolcanoesSuccess: (
      state,
      action: PayloadAction<VolcanoDataInterface[]>
    ) => {
      state.loading = false;
      state.error = false;
      state.volcanoes = action.payload;
    },

    loadVolcanoesFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.volcanoes = [];
    },
  },
});

export const { loadVolcanoes, loadVolcanoesSuccess, loadVolcanoesFailed } =
volcanoSlice.actions;

export const selectWildfire = (state: RootState) => state.volcanoes.volcanoes;

export default volcanoSlice.reducer;
