import { configureStore } from "@reduxjs/toolkit";

import wildfireReducer from "./wildfire";
import stormReducer from "./storm";

export const store = configureStore({
  reducer: {
    wildfire: wildfireReducer,
    storm: stormReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
