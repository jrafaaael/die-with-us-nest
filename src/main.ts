import { HttpAdapterHost, NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { PrismaClientKnowRequestErrorFilter } from "./filters/prisma.filter";
import { ZodFilter } from "./filters/zod.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalFilters(new PrismaClientKnowRequestErrorFilter(httpAdapter));
  app.useGlobalFilters(new ZodFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
