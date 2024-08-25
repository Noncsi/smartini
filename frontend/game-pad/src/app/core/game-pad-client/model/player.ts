export interface Player {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
}

// (input = RoomId = ASDAFG),
//   (PlayerName = skhjfsd),
//   (output = { socketId: 12, roomId: ASDAFG, isReady: false });

// input = isReady = true;
// output = { socketId: 12, roomId: ASDAFG, isReady: true };
