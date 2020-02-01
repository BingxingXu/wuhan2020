import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BannerModule } from './banner/banner.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BannerModule,
    NewsModule,
  ],
})
export class AppModule { }
