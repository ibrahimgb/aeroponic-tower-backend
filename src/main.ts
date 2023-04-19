import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new ConfigService();
  const PORT = config.get('PORT') || 3000;
  console.log('live on port ' + PORT);
  await app.listen(PORT);
}
bootstrap();
