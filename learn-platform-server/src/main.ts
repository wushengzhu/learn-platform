import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv'; // 注意这里必须引用在AppModule前
import { AppModule } from './app.module';

// 加载.env配置
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    // origin: 'http://localhost:5173',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type',
    // preflightContinue: false,
    // optionsSuccessStatus: 200,
  };
  // 允许跨域
  app.enableCors(corsOptions);
  await app.listen(1024);
}
bootstrap();
