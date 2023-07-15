import { WxorderResolver } from './wxorder.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Wxorder } from './models/wxorder.entity';
import { WxorderService } from './wxorder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wxorder])],
  providers: [WxorderService, WxorderResolver],
  exports: [WxorderService],
})
export class WxorderModule {}
