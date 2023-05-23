import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(username: string) {
    const user = await this.prisma.user.create({
      data: {
        username,
      },
    });

    return user;
  }

  async isUsernameAvailable(username: string) {
    const firstUsernameFound = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return firstUsernameFound === null;
  }
}
