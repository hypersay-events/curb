import fastify from "fastify";
// import fastifyIO from "fastify-socket.io";
import socketTransport from "./socketTransport";
import { RoomsManager } from "./RoomsManager";
import api from "./api";

const serverStart = async () => {
  const server = fastify({
    logger: {
      level: "debug",
    },
  });
  const roomsManager = new RoomsManager();
  try {
    server.register(socketTransport, {
      roomsManager,
    });
    server.register(api, {
      roomsManager,
    });
    await server.listen({
      port: 4554,
      host: "0.0.0.0",
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

serverStart();

["exit", "SIGINT", "SIGTERM"].forEach((eventType) => {
  process.on(eventType as any, () => {
    process.exit();
  });
});
