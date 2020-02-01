import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { Banner } from './banner.entity';
import { BannerService } from './banner.service';

@Crud({
    model: {
        type: Banner,
    },
})
@Controller('banners')
export class BannerController {
    constructor(public service: BannerService) { }
}
