import { Caption, Prisma } from "@prisma/client";
import { singleton } from "tsyringe";
import { PrismaService } from "./PrismaService";

@singleton()
export default class CaptionDBService {
  constructor(private readonly prisma: PrismaService) {}

  saveCaption(data: Prisma.CaptionCreateInput) {
    return this.prisma.caption.create({
      data,
    });
  }

  /**
   * List captions in a specifica language. If no language is specified, orginal caprions are returned
   */
  async listCaptions(opt: {
    roomName: string;
    language?: string;
    startingFrom?: number;
  }): Promise<{ captions: Caption[]; startAt: number }> {
    const { roomName, language = null, startingFrom = 0 } = opt;

    const captions = await this.prisma.caption.findMany({
      where: {
        roomName,
        targetLanguage: language,
        timestampStart: { gte: startingFrom },
      },
      orderBy: {
        timestampStart: "asc",
      },
    });
    let startAt: number;
    if (!language) {
      startAt = Number(captions?.[0].timestampStart || 0);
    } else {
      const first = await this.prisma.caption.findFirst({
        where: {
          roomName,
        },
        orderBy: {
          timestampStart: "asc",
        },
      });
      startAt = Number(first?.timestampStart || 0);
    }

    return { captions, startAt };
  }

  async listAvailableLanguages(roomName: string): Promise<string[]> {
    const grouped = await this.prisma.caption.groupBy({
      by: ["targetLanguage"],
      where: {
        roomName,
      },
    });
    return grouped.map((g) => g.targetLanguage).filter((l): l is string => !!l);
  }
}
