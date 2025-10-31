enum SocketEvent {
  Connection = "connection",
  Connect = "connect",
  Disconnect = "disconnect",
  CreateRoomAttempt = "createRoomAttempt",
  CreateRoomSuccess = "createRoomSuccess",
  CreateRoomError = "createRoomError",
  JoinRoomAttempt = 'joinRoom',
  JoinRoomSuccess = 'joinRoomSuccess',
  JoinRoomError = 'joinRoomError',
  Players = 'players',
  SetReadyStatusAttempt = 'setReadyStatusAttempt',
  SetReadyStatusSuccess = 'setReadyStatusSuccess',
  SetReadyStatusError = 'setReadyStatusError',
  PlayerSetReady = 'playerSetReady',
};

export default SocketEvent;
