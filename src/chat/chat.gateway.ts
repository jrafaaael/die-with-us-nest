import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { randomUUID } from "node:crypto";
import { Server } from "socket.io";

import { NewMessage } from "./interface/message.interface";

@WebSocketGateway(3001, {
  cors: "*",
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("message.send")
  handleMessage(@MessageBody() data: NewMessage) {
    this.server.emit("message.receive", {
      ...data,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    });
  }
}
