import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dict } from './models/dict.entity';
import { DictResolver } from './dict.resolver';
import { DictService } from './dict.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dict])],
  providers: [DictService, DictResolver],
  exports: [DictService],
})
export class DictModule {}
