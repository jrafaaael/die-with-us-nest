import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";

import { replacePlaceholders } from "src/utils/replace-placeholders";

import { PRISMA_ERRORS } from "../utils/errors";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnowRequestErrorFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const draftMessage = PRISMA_ERRORS?.[exception.code]?.message;
    const message = replacePlaceholders({
      str: draftMessage,
      placeholders: {
        column: exception.meta.target[0],
      },
    });

    if (message) {
      return response.status(HttpStatus.CONFLICT).json({ message });
    }

    super.catch(exception, host);
  }
}
