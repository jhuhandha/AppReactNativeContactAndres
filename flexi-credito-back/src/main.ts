import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

const configServer = config.get('server')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors()  

  await app.listen(configServer.port);
  console.log(`Nestjs🚀🚀  listening to port ${configServer.port}`)
}
bootstrap();
