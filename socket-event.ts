enum SocketEvent {
  CreateRoom = "CreateRoom",
  ConnectPlayer = "ConnectPlayer",
  JoinRoom = 'JoinRoom',
  JoinRoomSuccess = 'JoinRoomSuccess',
  JoinRoomError = 'JoinRoomError',
  ToggleReadyStatus = 'ToggleReadyStatus',
  ToggleReadyStatusSuccess = 'ToggleReadyStatusSuccess',
  ToggleReadyStatusError = 'ToggleReadyStatusError',
};

export default SocketEvent;
