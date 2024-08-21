"use strict";
// export default function ({ todoRepository }: Components) {
//   return {
//     playerJoined: async function (
//       payload: Omit<Todo, "id">,
//       callback: (res: Response<TodoID>) => void
//     ) {
//       // @ts-ignore
//       const socket: Socket<ClientEvents, ServerEvents> = this;
//       // validate the payload
//       const { error, value } = todoSchema.tailor("create").validate(payload, {
//         abortEarly: false,
//         stripUnknown: true,
//       });
//       if (error) {
//         return callback({
//           error: Errors.INVALID_PAYLOAD,
//           errorDetails: mapErrorDetails(error.details),
//         });
//       }
//       value.id = uuid();
//       // persist the entity
//       try {
//         await todoRepository.save(value);
//       } catch (e) {
//         return callback({
//           error: sanitizeErrorMessage(e),
//         });
//       }
//       // acknowledge the creation
//       callback({
//         data: value.id,
//       });
//       // notify the other users
//       socket.broadcast.emit("todo:created", value);
//     },
//   };
// }
