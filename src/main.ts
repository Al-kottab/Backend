import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const initializeApiDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Alkottab documentation')
    .setDescription('this is an api documentation for alkottab')
    .setVersion('1.0')
    .addTag('Alkottab')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  initializeApiDocumentation(app);
  await app.listen(3000);
}
bootstrap();
