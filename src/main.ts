import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Title Goes Here') // Todo: fill this out
    .setDescription('Set Description here') // Todo: fill this out
    .setVersion('1.0')
    .addTag('nothing') // Todo: fill this out
    .build(); // Todo: fill this out

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
  await app.listen(3000);
}
bootstrap();
