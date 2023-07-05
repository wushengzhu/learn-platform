import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Card } from './models/card.entity';
import { CardResolver } from './card.resolver';
import { CardService } from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
