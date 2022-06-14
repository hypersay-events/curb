import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import fp from "fastify-plugin";
import { RoomsManager } from "./RoomsManager";

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

interface ApiOptions {
  roomsManager: RoomsManager;
}

const api: FastifyPluginAsync<ApiOptions> = async (
  fastify,
  { roomsManager }
) => {
  fastify.post<{
    Body: {
      roomName: string;
      lang: string;
      text: string;
    };
  }>("/caption", opts, async (request, _reply) => {
    const room = roomsManager.getOrCreateRoom(request.body.roomName);
    room.room.addMessage({
      lang: request.body.lang,
      text: request.body.text,
    });
    return { status: 200 };
  });
};

export default fp(api, { fastify: "4.x" });
