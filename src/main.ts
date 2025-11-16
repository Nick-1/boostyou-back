import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.info('process.env.APP_PORT', process.env.APP_PORT);

  await app.listen(process.env.APP_PORT ?? 8010);
}
bootstrap();
