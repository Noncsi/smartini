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
  ToggleReadyStatusAttempt = 'toggleReadyStatus',
  ToggleReadyStatusSuccess = 'toggleReadyStatusSuccess',
  ToggleReadyStatusError = 'toggleReadyStatusError',
};

export default SocketEvent;
