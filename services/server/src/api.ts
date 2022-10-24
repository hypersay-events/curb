import { timeStamp } from "console";
import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import fp from "fastify-plugin";
import { ExportType, RoomsManager } from "./RoomsManager";
import sanitizeHtml from "sanitize-html";

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
  }>("/caption", opts, async (request, reply) => {
    const room = roomsManager.getOrCreateRoom(request.body.roomName);

    if (
      typeof request.body.lang !== "string" ||
      request.body.lang.length <= 1 ||
      request.body.lang.length >= 6
    ) {
      reply.status(400);
      return { error: "language" };
    }

    if (
      typeof request.body.timestampStart !== "number" ||
      Math.abs(request.body.timestampStart - Date.now()) >= 12 * 60 * 60 * 1000
    ) {
      reply.status(400);
      return { error: "timestampStart" };
    }

    if (
      typeof request.body.timestampEnd === "number" &&
      Math.abs(request.body.timestampEnd - Date.now()) >= 12 * 60 * 60 * 1000
    ) {
      reply.status(400);
      return { error: "timestampEnd" };
    }

    if (
      typeof request.body.timestampEnd !== "number" &&
      typeof request.body.timestampEnd !== "undefined"
    ) {
      reply.status(400);
      return { error: "timestampEnd" };
    }

    if (
      typeof request.body.transient !== "boolean" &&
      typeof request.body.transient !== "undefined"
    ) {
      reply.status(400);
      return { error: "transient" };
    }

    if (
      typeof request.body.skipTranslate !== "boolean" &&
      typeof request.body.skipTranslate !== "undefined"
    ) {
      reply.status(400);
      return { error: "skipTranslate" };
    }

    const clean = sanitizeHtml(request.body.text, {
      allowedTags: ["b", "i", "em", "strong"],
      allowedAttributes: {},
      allowedIframeHostnames: [],
    });

    room.room.addMessage({
      lang: request.body.lang || "auto",
      text: clean,
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
      startingFrom?: string;
    };
  }>("/export", async (request, reply) => {
    const exported = await roomsManager.export({
      ...request.query,
      startingFrom:
        typeof request.query.startingFrom !== "undefined"
          ? parseInt(request.query.startingFrom)
          : undefined,
    });
    reply.header("Content-Type", `text/${request.query.format}; charset=utf-8`);
    reply.send(exported);
  });

  fastify.get<{
    Querystring: {
      roomName: string;
    };
  }>("/listAvailableTranslations", async (request, reply) => {
    try {
      const languages = await roomsManager.getRoomAvailableLanguages({
        roomName: request.query.roomName,
      });
      reply.send(languages);
    } catch (e) {
      console.log("Cannot retrieve languages", e);
      return [];
    }
  });
};

export default fp(api, { fastify: "4.x" });
