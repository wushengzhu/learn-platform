import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [AuthService, AuthResolver,UserService],
  exports: [],
})
export class AuthModule {}
