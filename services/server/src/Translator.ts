import EventEmitter from "events";
import { autoInjectable, inject } from "tsyringe";
import { Config } from "./config/default";
import { Message, Room } from "./Room";
import CaptionDBService from "./services/CaptionDBService";
import TranslationService from "./services/TranslationService";

export interface Translation {
  text: string;
  targetLang: string;
}

@autoInjectable()
export class Translator extends EventEmitter {
  private readonly room: Room;
  private readonly targetLang: string;
  private readonly translationService: TranslationService;
  private readonly captionDBService: CaptionDBService;

  constructor(
    opt: { room: Room; targetLang: string },
    translationService?: TranslationService,
    captionDBService?: CaptionDBService
  ) {
    super();
    const { room, targetLang } = opt;
    this.room = room;
    this.targetLang = targetLang;
    this.translationService = translationService as TranslationService;
    this.captionDBService = captionDBService as CaptionDBService;

    this.room.on("message", this.translateMessage);
  }

  destroy() {
    this.room.off("message", this.translateMessage);
  }

  translateMessage = async (message: Message) => {
    if (this.targetLang === "original") {
      this.emit("translation", {
        text: message.text,
        targetLang: this.targetLang,
      } as Translation);
      return;
    }
    const translation = await this.translationService.translate({
      targetLanguage: this.targetLang,
      sourceLanguage: message.lang,
      text: message.text,
    });

    this.emit("translation", {
      roomName: this.room.id,
      sourceLanguage: message.lang,
      targetLang: this.targetLang,
      text: (translation || "").trim(),
      timestampStart: message.timestampStart,
      timestampEnd: message.timestampEnd,
    } as Translation);

    await this.captionDBService.saveCaption({
      roomName: this.room.id,
      sourceLanguage: message.lang,
      targetLanguage: this.targetLang,
      text: (translation || "").trim(),
      timestampStart: message.timestampStart,
      timestampEnd: message.timestampEnd,
    });
  };
}
