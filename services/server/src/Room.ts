import EventEmitter from "events";

export class Room extends EventEmitter {
  private readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  addMessage(message: Message) {
    this.emit("message", message);
  }
}
