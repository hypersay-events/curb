import { DestinationStream, LoggerOptions } from "pino";
import { loadEnv } from "../utilities/loadEnv";

loadEnv();

export interface LoggerConfig {
  /**
   * level: The log level. One among: fatal, error, warn, info, debug, trace, silent
   *        The log will appear from your choosen level and upon, i.e.
   *        (error -> error, fatal)
   *        (info -> info, warn, error, fatal)
   * pretty: Print a pretty out instead of the json one
   */
  options: LoggerOptions;
  /**
   * destination: Where to stream the log. Can be `stdout`, `stderr` or a file path
   */
  destination?: DestinationStream;

  enableRequestsLogging?: boolean;
}

interface TranslationServicesOptions {
  disableCache?: boolean;
  google?: {
    apiKey?: string;
  };
  deepl?: {
    apiKey?: string;
    /**
     * Being experimental, only these language are enabled for Deepl
     */
    languages: string[];
    /**
     * Force usage of deepl free api
     */
    useFreeApi?: boolean;
  };
}

export interface Config {
  translationServices: TranslationServicesOptions;
  logger: LoggerConfig;
  port?: number;
}

const defaultConfig: Config = {
  logger: {
    options: {
      level: process.env.LOG_LEVEL || "debug",
    },
    destination: process.stdout,
    enableRequestsLogging: process.env.ENABLE_REQUESTS_LOGGING === "true",
  },
  port: parseInt(process.env.PORT || "4554", 10),
  translationServices: {
    disableCache: false,
    google: {
      apiKey: process.env.GOOGLE_API_KEY as string,
    },
    deepl: {
      apiKey: process.env.DEEPL_API_KEY as string,
      languages: [
        "bg",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "es",
        "et",
        "fi",
        "fr",
        "hu",
        "it",
        "ja",
        "lt",
        "lv",
        "nl",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "sl",
        "sv",
        "zh",
      ],
      useFreeApi: process.env.DEEPL_USE_PRO !== "true",
    },
  },
};

export default defaultConfig;
