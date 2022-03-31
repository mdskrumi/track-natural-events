import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface IceDataInterface {
  id: string | null;
  title: string | null;
  date: string | null;
  coordinate: CoordinateInterface | null;
}

interface State {
  loading: boolean;
  error: boolean;
  ices: IceDataInterface[];
}

const initialState: State = {
  loading: false,
  error: false,
  ices: [],
};

export const IceSlice = createSlice({
  name: "ice",
  initialState,
  reducers: {
    loadIce: (state) => {
      state.loading = true;
      state.error = false;
      state.ices = [];
    },
    loadIceSuccess: (
      state,
      action: PayloadAction<IceDataInterface[]>
    ) => {
      state.loading = false;
      state.error = false;
      state.ices = action.payload;
    },

    loadIceFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.ices = [];
    },
  },
});

export const { loadIce, loadIceSuccess, loadIceFailed } =
IceSlice.actions;

export const selectIce = (state: RootState) => state.ice.ices;

export default IceSlice.reducer;
