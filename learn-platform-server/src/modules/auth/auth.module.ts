import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, AuthResolver],
  exports: [],
})
export class AuthModule {}
