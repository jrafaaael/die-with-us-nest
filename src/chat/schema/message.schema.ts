import { z } from "zod";
import { usernameSchema } from "src/users/schema/user.schema";

export const newMessageSchema = z.object({
  message: z.string(),
  username: usernameSchema,
  optimisticId: z.string(),
});
