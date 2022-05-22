import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import config from 'src/common/config.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(config.PORT);
  console.log(`Application is running on: ${await app.getUrl()}/graphql`);
}
bootstrap();
