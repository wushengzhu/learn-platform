import { Module } from '@nestjs/common';
import { ScheduleRecordModule } from './modules/schedule-record/schedule-record.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { CardRecordModule } from './modules/card-record/card-record.module';
import { WxorderModule } from './modules/wxorder/wxorder.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { OSSModule } from './modules/oss/oss.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { ShopModule } from './modules/shop/shop.module';
import { DictModule } from './modules/dict/dict.module';
import { CourseModule } from './modules/course/course.module';
import { CardModule } from './modules/card/card.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB,
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      // autoSchemaFile:true,
      autoSchemaFile: './schema.gql',
    }),
    UserModule,
    OSSModule,
    StudentModule,
    ShopModule,
    AuthModule,
    DictModule,
    CourseModule,
    CardModule,
    ProductModule,
    OrderModule,
    WxorderModule,
    CardRecordModule,
    TeacherModule,
    ScheduleModule,
    ScheduleRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
