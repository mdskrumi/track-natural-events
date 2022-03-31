import { configureStore } from "@reduxjs/toolkit";

import wildfireReducer from "./wildfire";
import stormReducer from "./storm";
import volcanoesReducer from "./volcano";
import iceReducer from "./ice";

export const store = configureStore({
  reducer: {
    wildfire: wildfireReducer,
    storm: stormReducer,
    volcanoes: volcanoesReducer,
    ice: iceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
