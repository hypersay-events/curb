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
      logger.trace("Query: " + e.query);
      logger.trace("Params: " + e.params);
      logger.trace("Duration: " + e.duration + "ms");
      logger.trace("================================");
    });
  }
}
