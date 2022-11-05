import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1/user-service");
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: "localhost",
      port: 6379,
    },
  });
  const config = new DocumentBuilder()
    .setTitle("User service")
    .setDescription("This service is for user")
    .setVersion("1.0")
    .addTag("User")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api/v1/", app, document);

  // app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(5001, () => {
    Logger.log("The service is running on http://localhost:5001/api/v1/");
  });
}
bootstrap();
