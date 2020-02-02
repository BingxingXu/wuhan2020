import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScienceController } from './science.controller';
import { ScienceService } from './science.service';
import { Science } from './science.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Science])],
  controllers: [ScienceController],
  providers: [ScienceService],
})
export class ScienceModule { }
