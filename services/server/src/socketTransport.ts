import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Server } from "socket.io";
import { RoomsManager } from "./RoomsManager";
import { Translation } from "./Translator";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

interface socketTransportOptions {
  roomsManager: RoomsManager;
}

const socketTransport: FastifyPluginAsync<socketTransportOptions> = async (
  fastify,
  { roomsManager }
) => {
  const io = new Server(fastify.server, {
    cors: {
      origin: true,
    },
  });
  fastify.decorate("io", io);
  fastify.addHook("onClose", (fastify, done) => {
    fastify.io.close();
    done();
  });

  io.on("connection", (socket) => {
    const roomName = socket.handshake.query.roomName as string;
    const targetLang = socket.handshake.query.targetLang as string;
    const translator = roomsManager.addClientToRoom({
      roomName,
      targetLang,
    });
    fastify.log.debug(
      {
        roomName,
        targetLang,
      },
      "client connected"
    );

    const onTranslation = (translation: Translation) => {
      console.log("emitting");
      socket.emit("translation", translation);
    };

    translator.on("translation", onTranslation);
    socket.on("disconnecting", () => {
      fastify.log.debug(
        {
          roomName,
          targetLang,
        },
        "client disconnected"
      );
      translator.off("translation", onTranslation);
      roomsManager.removeClientFromRoom({
        roomName,
        targetLang,
      });
    });
  });
};

export default fp(socketTransport, { fastify: "4.x" });
