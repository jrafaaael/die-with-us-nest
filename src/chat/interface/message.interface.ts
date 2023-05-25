import { z } from "zod";
import { newMessageSchema } from "../schema/message.schema";

export type NewMessage = z.infer<typeof newMessageSchema>;
