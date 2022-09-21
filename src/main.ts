import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['verbose', 'debug', 'log', 'error', 'warn'],
    });
    app.useGlobalPipes(new ValidationPipe());
    //app.setGlobalPrefix('api');
    await app.listen(process.env.PORT);
    console.info(`App start on port:${process.env.PORT}`);
  } catch (err) {
    console.error(`Fatal error can't boot application.`, err.message);
    process.exit(1);
  }
}
bootstrap();
