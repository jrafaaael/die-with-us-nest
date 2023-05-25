import { z } from "zod";

import { createUserSchema } from "../schema/user.schema";

export type CreateUser = z.infer<typeof createUserSchema>;
