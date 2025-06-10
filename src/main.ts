import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors()
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
    }
  })
  await app.listen(3000);
}
bootstrap();
