import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";

import { replacePlaceholders } from "../utils/replace-placeholders";

const PRISMA_ERROR_REFERENCE = {
  P2002: (meta: { target: [string] }) => {
    const target = meta.target[0];

    return {
      message: replacePlaceholders({
        str: "{column} already exists",
        placeholders: { column: target },
      }),
      statusCode: HttpStatus.CONFLICT,
    };
  },
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnowRequestErrorFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorReference =
      PRISMA_ERROR_REFERENCE?.[exception.code]?.(exception.meta) ?? null;

    if (errorReference) {
      return response
        .status(errorReference.statusCode)
        .json({ message: errorReference.message });
    }

    super.catch(exception, host);
  }
}
