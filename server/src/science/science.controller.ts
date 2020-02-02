import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { Science } from './science.entity';
import { ScienceService } from './science.service';

@Crud({
    model: {
        type: Science,
    },
})
@Controller('sciences')
export class ScienceController {
    constructor(public service: ScienceService) { }
}
