import { Prisma, PrismaClient } from "@prisma/client";
import { Logger } from "pino";
import { inject, singleton } from "tsyringe";
import { Config } from "../config/default";

@singleton()
export class PrismaService extends PrismaClient {
  constructor(
    @inject("Logger") logger: Logger,
    @inject("Config") config: Config
  ) {
    let prismaConfig: Prisma.PrismaClientOptions = {
      log: [
        {
          emit: "event",
          level: "query",
        },
      ],
    };
    if (config.db.url) {
      prismaConfig = {
        ...prismaConfig,
        datasources: {
          db: config.db,
        },
      };
    }
    super(prismaConfig);
    this.$on("query" as any, (e: any) => {
      logger.trace("Query: " + e.query);
      logger.trace("Params: " + e.params);
      logger.trace("Duration: " + e.duration + "ms");
      logger.trace("================================");
    });
  }
}
