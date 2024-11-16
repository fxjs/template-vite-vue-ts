import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用跨域
  app.enableCors();

  await app.listen(process.env.PORT ?? 8888);
}
bootstrap();
