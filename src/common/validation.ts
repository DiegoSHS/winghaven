import { BadRequestException, ParseIntPipe } from "@nestjs/common";

export const customIdPipe = new ParseIntPipe({
    optional: true,
    exceptionFactory: () => new BadRequestException('The id must be a number'),
});