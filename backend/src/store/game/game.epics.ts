import { tap, ignoreElements, filter, withLatestFrom } from "rxjs/operators";
import type { Epic } from "redux-observable";
import SocketEvent from "../../../../shared/socket-event";
import { log } from "../../log";
import { GameActions } from "./game.actions";
import {
  createRoom,
  disconnectGameBoard,
  disconnectPlayer,
  playerJoins,
  setReady,
} from "./game.slice";
import {
  gameBoardSocketMap,
  playerSocketMap,
} from "../../services/socket-registry";
import { Player, SocketType } from "../types/game.types";
import { RootState } from "../config/store";
import { selectPlayerInRoomById, selectPlayersInRoom } from "./game.selectors";
// import { RootState } from "../types/store.types";

export const disconnectGameBoardEpic: Epic<
  GameActions,
  GameActions,
  RootState
> = (action$) =>
  action$.pipe(
    filter(disconnectGameBoard.match),
    tap(({ payload }) => {
      const { socket } = payload;
      gameBoardSocketMap.delete(socket.data.roomCode);
      log.info.gameBoardDisconnected(socket.id);
    }),
    ignoreElements()
  );
export const disconnectPlayerEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(disconnectPlayer.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { socket } = payload;
      const { roomCode, playerId } = socket.data;
      playerSocketMap.delete(playerId);

      console.log("asd");

      gameBoardSocketMap
        .get(roomCode)
        ?.emit(SocketEvent.Players, selectPlayersInRoom(state.game, roomCode));

      log.info.playerDisconnected(playerId, roomCode, socket.id);
    }),
    ignoreElements()
  );

export const emitNewRoomEpic: Epic<GameActions, GameActions, RootState> = (
  action$
) =>
  action$.pipe(
    filter(createRoom.match),
    tap(({ payload }) => {
      const { socket, newRoomCode } = payload;
      gameBoardSocketMap.set(newRoomCode, socket);
      socket.join(newRoomCode);
      socket.data.clientType = SocketType.GameboardSocket;
      socket.data.roomCode = newRoomCode;
      socket.emit(SocketEvent.CreateRoomSuccess, newRoomCode);
      log.info.roomCreated(newRoomCode);
    }),
    ignoreElements()
  );

export const playerJoinsEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(playerJoins.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode, newPlayerId, newPlayerName, socket } = payload;

      const newPlayer = selectPlayerInRoomById(
        state.game,
        roomCode,
        newPlayerId
      );
      if (!newPlayer) {
        socket.emit(SocketEvent.JoinRoomError);
        return;
      }

      socket.join(roomCode);
      socket.data.clientType = SocketType.PlayerSocket;
      socket.data.roomCode = roomCode;
      socket.data.playerId = newPlayer.id;
      playerSocketMap.set(newPlayerId, socket);

      gameBoardSocketMap
        .get(roomCode)
        ?.emit(SocketEvent.Players, selectPlayersInRoom(state.game, roomCode));
      socket.emit(SocketEvent.JoinRoomSuccess, newPlayer.id);

      log.info.playerJoined(newPlayerName, roomCode);
    }),
    ignoreElements()
  );

export const setReadyEpic: Epic<GameActions, GameActions, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(setReady.match),
    withLatestFrom(state$),
    tap(([{ payload }, state]) => {
      const { roomCode, playerId, isReady } = payload;
      const gameBoardSocket = gameBoardSocketMap.get(roomCode);
      gameBoardSocket?.emit(SocketEvent.PlayerSetReady, {
        playerId,
        isReady,
      });

      log.info.playerStatusSet(playerId, roomCode, isReady);

      const players = selectPlayersInRoom(state.game, roomCode);
      if (players?.every((player: Player) => player.isReady)) {
        // getQuestion(room.socket, room.roomCode).subscribe();
        gameBoardSocket?.to(roomCode).emit(SocketEvent.StartGame);
      }
    }),
    ignoreElements()
  );

// export const startGameEpic = (action$, state$, { io }) =>
//   action$.pipe(
//     ofType(allPlayersReady.type),
//     withLatestFrom(state$),
//     mergeMap(([action, state]: [any, RootState]) => {
//       const { roomCode } = action.payload;

//       return from(fetchQuestion()).pipe(
//         tap((question) => {
//           // emit to all clients in the room
//           io.to(roomCode).emit('newQuestion', {
//             text: question.text,
//             options: question.options,
//           });
//         }),
//         map((question) => sendQuestion({ roomCode, question }))
//       );
//     })
//   );

// export const answerEpic = (action$, state$, { io }) =>
//   action$.pipe(
//     ofType(playerAnswered.type),
//     withLatestFrom(state$),
//     mergeMap(([action, state]) => {
//       const { roomCode, playerId, answer } = action.payload;
//       const room = state.game.rooms.find((r) => r.roomCode === roomCode);
//       const question = room?.currentQuestion;
//       const isCorrect = question?.correctAnswer === answer;

//       // emit feedback to the player
//       io.to(roomCode).emit('answerResult', { playerId, isCorrect });

//       // dispatch to update the store
//       return of(updateScores({ roomCode, playerId, isCorrect }));
//     })
//   );

// export const autoNextQuestionEpic = (action$, state$, { io }) =>
//   action$.pipe(
//     ofType(updateScores.type),
//     delay(5000), // wait 5s before next question
//     withLatestFrom(state$),
//     mergeMap(([action, state]) => {
//       const { roomCode } = action.payload;
//       return from(fetchQuestion()).pipe(
//         tap((question) =>
//           io.to(roomCode).emit('newQuestion', {
//             text: question.text,
//             options: question.options,
//           })
//         ),
//         map((question) => nextQuestion({ roomCode, question }))
//       );
//     })
//   );

// export const rootEpic: Epic<any, any, any, EpicDependencies> = combineEpics(
//   createRoomEpic,
//   playerJoinEpic
// );
// export const rootEpic = combineEpics(startGameEpic, answerEpic, autoNextQuestionEpic);
