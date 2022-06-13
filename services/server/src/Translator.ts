import EventEmitter from "events";
import { Message, Room } from "./Room";

export interface Translation {
  text: string;
  targetLang: string;
}

export class Translator extends EventEmitter {
  private readonly room: Room;
  private readonly targetLang: string;

  constructor(room: Room, targetLang: string) {
    super();
    this.room = room;
    this.targetLang = targetLang;

    this.room.on("message", this.translateMessage);
  }

  destroy() {
    console.log("destroying translator");
    this.room.off("message", this.translateMessage);
  }

  translateMessage = async (message: Message) => {
    console.log(
      `Translating message [${message.lang}]"${message.text}" to [${this.targetLang}]`
    );
    if (this.targetLang === "original") {
      this.emit("translation", {
        text: message.text,
        targetLang: this.targetLang,
      } as Translation);
      return;
    }
    this.emit("translation", {
      text: `${this.targetLang}: ${message.text}`,
      targetLang: this.targetLang,
    } as Translation);
  };
}
