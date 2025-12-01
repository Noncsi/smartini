// src/store/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "../game/game.slice";
import { createEpicMiddleware } from "redux-observable";
import type { GameActions } from "../types/game.actions";
import { rootEpic } from "./root-epic";

const epicMiddleware = createEpicMiddleware<GameActions, GameActions, RootState>();

const rootReducer = combineReducers({ game: gameReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.socket'],
      },
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
