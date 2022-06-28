import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import fp from "fastify-plugin";
import { ExportType, RoomsManager } from "./RoomsManager";

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
      lang?: string;
      text: string;
      timestampStart: number;
      timestampEnd?: number;
      transient?: boolean;
      skipTranslate?: boolean;
    };
  }>("/caption", opts, async (request, _reply) => {
    const room = roomsManager.getOrCreateRoom(request.body.roomName);
    room.room.addMessage({
      lang: request.body.lang || "auto",
      text: request.body.text,
      timestampStart: request.body.timestampStart,
      timestampEnd: request.body.timestampEnd,
      transient: request.body.transient,
      skipTranslate: request.body.skipTranslate,
    });
    return { status: 200 };
  });

  fastify.get<{
    Querystring: {
      roomName: string;
      language?: string;
      format: ExportType;
    };
  }>("/export", async (request, reply) => {
    const exported = await roomsManager.export(request.query);
    reply.header("Content-Type", `text/${request.query.format}; charset=utf-8`);
    reply.send(exported);
  });

  fastify.get<{
    Querystring: {
      roomName: string;
    };
  }>("/listAvailableTranslations", async (request, reply) => {
    const languages = await roomsManager.getRoomAvailableLanguages({
      roomName: request.query.roomName,
    });
    reply.send(languages);
  });
};

export default fp(api, { fastify: "4.x" });
