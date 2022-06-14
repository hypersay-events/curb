import pino, { DestinationStream, Logger } from "pino";
import { Config, LoggerConfig } from "../config/default";

let logger: pino.Logger;

const getLogger = (config: Config): Logger => {
  if (logger) return logger;
  const { logger: loggerOptions } = config;
  const { options, destination } = loggerOptions as LoggerConfig;

  logger = pino(options, destination as DestinationStream);

  return logger;
};

export default getLogger;
