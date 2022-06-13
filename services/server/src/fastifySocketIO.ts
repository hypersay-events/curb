import fp from "fastify-plugin";
import { Server } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

export default fp(
  async function (fastify, opts) {
    fastify.decorate("io", require("socket.io")(fastify.server, opts));
    fastify.addHook("onClose", (fastify, done) => {
      fastify.io.close();
      done();
    });
  },
  { fastify: "4.x" }
);
