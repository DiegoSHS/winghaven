import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch() // This will catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        console.log('Exception caught by AllExceptionsFilter:', exception);
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal server error';
        const errorMessage =
            typeof message === 'string'
                ? message
                : (message as any).message || 'Internal server error';
        response.statusCode = status;
        response.send({
            message: errorMessage,
            data: null,
            error: 'Something went wrong',
        });
    }
}