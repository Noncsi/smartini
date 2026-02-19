import { combineEpics, Epic } from 'redux-observable';
import { GameActions } from '../types/game.actions';
import { RootState } from './store';
import { cleanupGameBoardDisconnectionEpic } from '../game/epics/cleanups/cleanup-gameboard-disconnection.epic';
import { cleanupPlayerDisconnectionEpic } from '../game/epics/cleanups/cleanup-player-disconnection.epic';
import { setupRoomOnCreateRoomEpic } from '../game/epics/setups/setup-room-on-create-room.epic';
import { fetchQuestionsEpic } from '../game/epics/fetch-questions.epic';
import { setupPlayerOnPlayerJoinsEpic } from '../game/epics/setups/setup-player-on-player-joins.epic';
import { broadcastReadyStatusEpic } from '../game/epics/broadcast-ready-status.epic';
import { triggerPreQuestionCountdownOnGameStartEpic } from '../game/epics/trigger-pre-question-countdown-on-gamestart.epic';
import { startPreQuestionCountdownEpic } from '../game/epics/start-pre-question-countdown.epic';
import { showCorrectAnswerAfterRaceConditionEpic } from '../game/epics/show-correct-answer-after-race-condition.epic';
import { emitScoresEpic, nextQuestionEpic } from '../game/epics/next-question.epic';
import { emitFirstQuestionEpic } from '../game/epics/emit-first-question.epic';
import { emitCurrentQuestionEpic } from '../game/epics/emit-current-question.epic';

export const rootEpic: Epic<GameActions, GameActions, RootState> = combineEpics(
  cleanupGameBoardDisconnectionEpic,
  cleanupPlayerDisconnectionEpic,
  setupRoomOnCreateRoomEpic,
  setupPlayerOnPlayerJoinsEpic,
  broadcastReadyStatusEpic,
  fetchQuestionsEpic,
  triggerPreQuestionCountdownOnGameStartEpic,
  emitFirstQuestionEpic,
  emitCurrentQuestionEpic,
  startPreQuestionCountdownEpic,
  showCorrectAnswerAfterRaceConditionEpic,
  nextQuestionEpic,
  emitScoresEpic,
);
