import fastify from "fastify";
// import fastifyIO from "fastify-socket.io";
import fastifyIO from "./fastifySocketIO";

const serverStart = async () => {
  const server = fastify({
    logger: true,
  });
  try {
    server.register(fastifyIO);
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
