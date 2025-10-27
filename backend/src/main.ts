import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('SmartFlow API')
    .setDescription(
      'API pour la gestion de devis, factures et acomptes pour freelances',
    )
    .setVersion('1.0')
    .addTag('parametres', 'Gestion des paramètres de configuration')
    .addTag('clients', 'Gestion des clients')
    .addTag('devis', 'Gestion des devis')
    .addTag('factures', 'Gestion des factures')
    .addTag('paiements', 'Gestion des paiements')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
