import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
      origin: '*',
    },
  });
  await app.listen(3020);
}
bootstrap();
