import { Config } from "./config/default";
import { Room } from "./Room";
import { Translator } from "./Translator";

interface RoomWithTranslators {
  room: Room;
  langs: Record<
    string,
    {
      connected: number;
      translator: Translator;
    }
  >;
}

export class RoomsManager {
  private rooms: Map<string, RoomWithTranslators> = new Map();
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getRoom(roomName: string) {
    return this.rooms.get(roomName);
  }

  getOrCreateRoom(roomName: string): RoomWithTranslators {
    if (!this.rooms.has(roomName)) {
      const room = new Room(roomName);
      this.rooms.set(roomName, {
        room,
        langs: {},
      });
    }
    return this.rooms.get(roomName) as RoomWithTranslators;
  }

  addClientToRoom(opt: { roomName: string; targetLang: string }): Translator {
    const room = this.getOrCreateRoom(opt.roomName);

    if (!room.langs[opt.targetLang]) {
      room.langs[opt.targetLang] = {
        connected: 1,
        translator: new Translator({
          room: room.room,
          targetLang: opt.targetLang,
        }),
      };
    } else {
      room.langs[opt.targetLang] = {
        ...room.langs[opt.targetLang],
        connected: room.langs[opt.targetLang].connected + 1,
      };
    }
    return room.langs[opt.targetLang].translator;
  }

  removeClientFromRoom(opt: { roomName: string; targetLang: string }): void {
    const room = this.getRoom(opt.roomName);
    if (!room?.langs[opt.targetLang]) {
      return;
    }
    room.langs[opt.targetLang].connected -= 1;
    if (room.langs[opt.targetLang].connected === 0) {
      room.langs[opt.targetLang].translator.destroy();
      delete room.langs[opt.targetLang];
    }
  }
}
