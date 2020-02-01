import { Module, HttpModule } from '@nestjs/common';
import { CountController } from './count.controller';

@Module({
  imports: [HttpModule],
  controllers: [CountController],
})
export class CountModule { }
