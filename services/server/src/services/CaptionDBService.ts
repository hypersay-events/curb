import { Prisma } from "@prisma/client";
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
}
