import fp from "fastify-plugin";
import { Server } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

export default fp(
  async function (fastify, opts) {
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
      console.log(`Socket connected ${socket.id}`);
      console.log(socket.handshake.query);
    });
  },
  { fastify: "4.x" }
);
