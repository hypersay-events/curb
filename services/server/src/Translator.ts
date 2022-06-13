import EventEmitter from "events";
import { Room } from "./Room";

interface Translation {
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

    this.room.on("message", this.translateMessage.bind(this));
  }

  async translateMessage(message: Message) {
    console.log(
      `Translating message [${message.lang}]${message.text} to [${this.targetLang}]`
    );
    if (this.targetLang === "original") {
      this.emit("translation", {
        text: message.text,
        targetLang: this.targetLang,
      } as Translation);
      return;
    }
  }
}
