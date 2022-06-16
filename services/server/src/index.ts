import "reflect-metadata";
import fastify from "fastify";
import socketTransport from "./socketTransport";
import { RoomsManager } from "./RoomsManager";
import api from "./api";
import { createConfigManager } from "configuring";
import defaultConfig, { Config } from "./config/default";
import { container as Container } from "tsyringe";
import getLogger from "./utilities/logger";
import { Logger } from "pino";
import fastifyCors from "@fastify/cors";

const configManager = createConfigManager({
  configurations: {
    default: defaultConfig,
  },
});
const config = configManager.getConfig();
const logger = getLogger(config);

Container.register<Config>("Config", {
  useValue: config,
});

Container.register<Logger>("Logger", {
  useValue: logger,
});

const serverStart = async () => {
  const requestLogEnabled = config.logger?.enableRequestsLogging || false;
  const server = fastify({
    logger,
    disableRequestLogging: !requestLogEnabled,
  });
  const roomsManager = Container.resolve(RoomsManager);
  try {
    server.register(fastifyCors, {
      origin: true,
      maxAge: 60 * 60 * 24,
    });
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
