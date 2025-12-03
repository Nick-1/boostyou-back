import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.info('process.env.APP_PORT', process.env.APP_PORT);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5175',
      'https://boostyou.us',
      'https://business.boostyou.us',
    ],
    methods: 'GET,POST,PUT,DELETE',
  });

  await app.listen(process.env.APP_PORT ?? 8010);
}
bootstrap();
