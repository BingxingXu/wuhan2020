import { Module, HttpModule, CacheModule } from '@nestjs/common';
import { NewsController } from './news.controller';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 60 * 60,
    }),
  ],
  controllers: [NewsController],
})
export class NewsModule { }
