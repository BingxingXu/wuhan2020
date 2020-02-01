import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { CountController } from './count.controller';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 60 * 60,
    }),
  ],
  controllers: [CountController],
})
export class CountModule { }
