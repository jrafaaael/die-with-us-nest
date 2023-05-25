import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";
import { ZodError } from "zod";

@Catch(ZodError)
export class ZodFilter extends BaseExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const errors = exception.errors.map(({ message, path }) => ({
      message,
      field: path[0],
    }));

    res.status(HttpStatus.BAD_REQUEST).json({ errors });
  }
}
