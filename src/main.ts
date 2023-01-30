import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const initializeApiDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Alkottab documentation')
    .setDescription(
      'This is an API documentation for Al-Kottab web application',
    )
    .setVersion('1.0')
    .addTag('Al-Kottab', 'Al-Kottab API Documentation')
    .addTag('Organization', 'Organization APIs')
    .addBearerAuth(
      {
        description:
          'Please enter received token in headers with key (Authorization) with the following format: "Bearer (Received Token)"',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  initializeApiDocumentation(app);
  app.useGlobalPipes(
    // For making dto to filter any attribute rather than its data
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
