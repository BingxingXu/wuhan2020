import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Science } from './science.entity';

@Injectable()
export class ScienceService extends TypeOrmCrudService<Science> {
    constructor(@InjectRepository(Science) repo) {
        super(repo);
    }
}
