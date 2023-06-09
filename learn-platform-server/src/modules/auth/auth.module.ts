import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { StudentService } from '../student/student.service';
import { Student } from '../student/models/student.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 7 + 's',
      },
    }),
    TypeOrmModule.forFeature([User, Student]),
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    AuthService,
    AuthResolver,
    UserService,
    StudentService,
  ],
  exports: [],
})
export class AuthModule {}
