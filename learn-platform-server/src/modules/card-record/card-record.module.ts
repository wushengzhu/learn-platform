import { CardRecordResolver } from './card-record.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CardRecord } from './models/card-record.entity';
import { CardRecordService } from './card-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardRecord])],
  providers: [CardRecordService, CardRecordResolver],
  exports: [CardRecordService],
})
export class CardRecordModule {}
