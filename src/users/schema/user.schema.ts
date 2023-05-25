import { z } from "zod";

const ALPHANUMERIC_AND_UNDERSCORE = /^[a-zA-z0-9_]+$/;

export const usernameSchema = z
  .string({
    required_error: "Username is required",
  })
  .regex(ALPHANUMERIC_AND_UNDERSCORE, {
    message: "Username must be alphanumeric and '_'",
  })
  .min(3, { message: "Username must be 3 or more characters long" })
  .max(12, { message: "Username must be 12 or fewer characters long" });

export const createUserSchema = z.object({
  username: usernameSchema,
});
