import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  let app;

  if (process.env.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('NodeJS - API')
    .setDescription('The NodeJS admin API')
    .setVersion('1.0')
    .addTag('Trello')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);


  await process.env.USE_FASTIFY !== 'true' ? app.listen(PORT) : app.listen(PORT, '0.0.0.0');
}

bootstrap();
