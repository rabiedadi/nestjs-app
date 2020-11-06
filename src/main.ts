import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  global.console.clear();
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
