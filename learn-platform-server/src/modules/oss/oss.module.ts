import { ConsoleLogger, Module } from '@nestjs/common';
import { OSSService } from './oss.service';
import { OSSResolver } from './oss.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [OSSService, OSSResolver],
  exports: [],
})
export class OSSModule {}
