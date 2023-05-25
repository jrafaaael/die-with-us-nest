import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.usersService.create(username);

    return {
      user,
    };
  }

  @Get("username-available")
  async isUsernameAvailable(@Query("username") username: string) {
    return {
      available: await this.usersService.isUsernameAvailable(username),
    };
  }
}
