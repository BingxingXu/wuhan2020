import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Banner } from './banner.entity'

@Injectable()
export class BannerService extends TypeOrmCrudService<Banner> {
    constructor(@InjectRepository(Banner) repo) {
        super(repo);
    }
}
