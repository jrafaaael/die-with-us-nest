import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";

import { UserService } from "./users.service";
import { ZodValidationPipe } from "../zod.pipe";
import { createUserSchema } from "./schema/user.schema";
import { CreateUser } from "./interface/user.interface";

@Controller("users")
export class UsersController {
  constructor(private usersService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUser: CreateUser) {
    const { username } = createUser;
    const user = await this.usersService.create(username);

    return user;
  }

  @Get("username-available")
  async isUsernameAvailable(@Query("username") username: string) {
    return {
      available: await this.usersService.isUsernameAvailable(username),
    };
  }
}
