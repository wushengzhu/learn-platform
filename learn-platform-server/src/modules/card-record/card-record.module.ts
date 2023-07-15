import { CardRecordResolver } from './card-record.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRecord } from './models/card-record.entity';
import { CardRecordService } from './card-record.service';
import { CardModule } from '../card/card.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([CardRecord]), CardModule, StudentModule],
  providers: [CardRecordService, CardRecordResolver],
  exports: [CardRecordService],
})
export class CardRecordModule {}
