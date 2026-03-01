import { Player, Room, RoomCode } from '../store/types/game.types';
import { GameStage } from '../../../shared/types';

export const createRoomObject = (roomCode: RoomCode): Room => ({
  stage: GameStage.lobby,
  roomCode,
  players: [],
  hostPlayerId: '',
  allQuestions: [],
  currentRound: 0,
});

export const createPlayerObject = (id: string, name: string, iconId: number): Player => ({
  id,
  name,
  iconId,
  isReady: false,
  score: 0,
  hasAnswered: false,
});
