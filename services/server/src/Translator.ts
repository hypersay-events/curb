import EventEmitter from "events";
import { autoInjectable, inject } from "tsyringe";
import { Config } from "./config/default";
import { Message, Room } from "./Room";
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

  constructor(
    opt: { room: Room; targetLang: string },
    translationService?: TranslationService
  ) {
    super();
    const { room, targetLang } = opt;
    this.room = room;
    this.targetLang = targetLang;
    this.translationService = translationService as TranslationService;

    this.room.on("message", this.translateMessage);
  }

  destroy() {
    console.log("destroying translator");
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
      text: translation,
      targetLang: this.targetLang,
    } as Translation);
  };
}
