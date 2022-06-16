import EventEmitter from "events";
import { autoInjectable } from "tsyringe";
import CaptionDBService from "./services/CaptionDBService";

export interface Message {
  text: string;
  lang: string;
  timestampStart?: number;
  timestampEnd?: number;
}

@autoInjectable()
export class Room extends EventEmitter {
  readonly id: string;
  private readonly captionDBService: CaptionDBService;

  constructor(id: string, captionDBService?: CaptionDBService) {
    super();
    this.id = id;
    this.captionDBService = captionDBService as CaptionDBService;
  }

  async addMessage(message: Message) {
    this.emit("message", message);
    await this.captionDBService.saveCaption({
      roomName: this.id,
      sourceLanguage: message.lang,
      text: message.text,
      timestampStart: message.timestampStart,
      timestampEnd: message.timestampEnd,
    });
  }
}
