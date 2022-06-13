import { Room } from "./Room";
import { Translator } from "./Translator";

interface RoomWithTranslators {
  room: Room;
  translators: Record<string, Translator>;
}

export class RoomsManager {
  private rooms: Map<string, RoomWithTranslators> = new Map();

  constructor() {}

  getOrCreateRoom(roomName: string): RoomWithTranslators {
    if (!this.rooms.has(roomName)) {
      const room = new Room(roomName);
      this.rooms.set(roomName, {
        room,
        translators: {},
      });
    }
    return this.rooms.get(roomName) as RoomWithTranslators;
  }

  addTranslatorToRoom(opt: { roomName: string; targetLang: string }): boolean {
    const room = this.getOrCreateRoom(opt.roomName);
    if (!room.translators[opt.targetLang]) {
      room.translators[opt.targetLang] = new Translator(
        room.room,
        opt.targetLang
      );
    }
    return true;
  }
}
