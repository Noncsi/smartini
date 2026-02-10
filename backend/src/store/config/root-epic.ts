import { combineEpics, Epic } from "redux-observable";
import { GameActions } from "../types/game.actions";
import { RootState } from "./store";
import { cleanupGameBoardDisconnectionEpic } from "../game/epics/cleanups/cleanup-gameboard-disconnection.epic";
import { cleanupPlayerDisconnectionEpic } from "../game/epics/cleanups/cleanup-player-disconnection.epic";
import { setupRoomOnCreateRoomEpic } from "../game/epics/setups/setup-room-on-create-room.epic";
import { broadcastQuestionToGameBoardEpic } from "../game/epics/broadcast-question-to-gameboard.epic";
import { fetchQuestionEpic } from "../game/epics/fetch-question.epic";
import { setupPlayerOnPlayerJoinsEpic } from "../game/epics/setups/setup-player-on-player-joins.epic";
import { broadcastReadyStatusEpic } from "../game/epics/broadcast-ready-status.epic";
import { triggerPreQuestionCountdownOnGameStartEpic } from "../game/epics/trigger-pre-question-countdown-on-gamestart.epic";
import { startPreQuestionCountdownEpic } from "../game/epics/start-pre-question-countdown.epic";
import { evaluateAnswerEpic } from "../game/epics/evaluate-answer.epic";
import { addToScoreOnAnsweredCorrectly } from "../game/epics/add-to-score-on-answered-correctly.epic";
import { handleCorrectAnswerEpic } from "../game/epics/handle-correct-answer.epic";
import { handleIncorrectAnswerEpic } from "../game/epics/handle-incorrect-answer.epic";
import { showCorrectAnswerAfterRaceConditionEpic } from "../game/epics/show-correct-answer-after-race-condition.epic";
import { broadcastScoresEpic } from "../game/epics/broadcast-scores.epic";
import { loadNextQuestionEpic } from "../game/epics/load-next-question.epic";

export const rootEpic: Epic<GameActions, GameActions, RootState> = combineEpics(
  cleanupGameBoardDisconnectionEpic,
  cleanupPlayerDisconnectionEpic,
  setupRoomOnCreateRoomEpic,
  setupPlayerOnPlayerJoinsEpic,
  broadcastReadyStatusEpic,
  fetchQuestionEpic,
  triggerPreQuestionCountdownOnGameStartEpic,
  broadcastQuestionToGameBoardEpic,
  startPreQuestionCountdownEpic,
  evaluateAnswerEpic,
  addToScoreOnAnsweredCorrectly,
  handleCorrectAnswerEpic,
  handleIncorrectAnswerEpic,
  showCorrectAnswerAfterRaceConditionEpic,
  broadcastScoresEpic,
  loadNextQuestionEpic
);
