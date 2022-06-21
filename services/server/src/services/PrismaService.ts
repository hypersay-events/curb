import { PrismaClient } from "@prisma/client";
import { Logger } from "pino";
import { inject, singleton } from "tsyringe";

@singleton()
export class PrismaService extends PrismaClient {
  constructor(@inject("Logger") logger: Logger) {
    super({
      log: [
        {
          emit: "event",
          level: "query",
        },
      ],
    });
    this.$on("query" as any, (e: any) => {
      logger.debug("Query: " + e.query);
      logger.debug("Params: " + e.params);
      logger.debug("Duration: " + e.duration + "ms");
      logger.debug("================================");
    });
  }
}
