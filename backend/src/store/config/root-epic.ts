import { combineEpics, Epic } from "redux-observable";
import { GameActions } from "../types/game.actions";
import { RootState } from "./store";
import { deleteSocketOnDisconnectGameBoardEpic } from "../game/epics/delete-socket-on-disconnect-gameboard.epic";
import { deleteSocketOnDisconnectPlayerEpic } from "../game/epics/delete-socket-on-disconnect-player.epic";
import { setupRoomOnCreateRoomEpic } from "../game/epics/setup-room-on-create-room.epic";
import { fetchQuestionSuccessEpic } from "../game/epics/fetch-question-success.epic";
import { fetchQuestionEpic } from "../game/epics/fetch-question.epic";
import { setupPlayerOnPlayerJoinsEpic } from "../game/epics/setup-player-on-player-joins.epic";
import { setReadyEpic } from "../game/epics/set-ready.epic";
import { fetchQuestionOnStartGameEpic } from "../game/epics/fetch-question-on-start-game";
import { startCountdownOnStartGameEpic } from "../game/epics/start-countdown-on-start-game.epic";
import { addToScoreOnAnsweredCorrectly, answeredCorrectlyEpic, answeredIncorrectlyEpic, emitAnswerResultsEpic, emitScoresEpic, evaluateAnswerEpic, nextQuestionEpic } from "../game/epics/add-to-score-if-answer-is-right.epic";

export const rootEpic: Epic<GameActions, GameActions, RootState> = combineEpics(
  deleteSocketOnDisconnectGameBoardEpic,
  deleteSocketOnDisconnectPlayerEpic,
  setupRoomOnCreateRoomEpic,
  setupPlayerOnPlayerJoinsEpic,
  setReadyEpic,
  fetchQuestionEpic,
  startCountdownOnStartGameEpic,
  fetchQuestionSuccessEpic,
  fetchQuestionOnStartGameEpic,
  evaluateAnswerEpic,
  addToScoreOnAnsweredCorrectly,
  answeredCorrectlyEpic,
  answeredIncorrectlyEpic,
  emitAnswerResultsEpic,
  emitScoresEpic,
  nextQuestionEpic
);
