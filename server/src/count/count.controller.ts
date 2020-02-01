import { Controller, Get, HttpService, CacheInterceptor, UseInterceptors } from '@nestjs/common';

@Controller('counts')
@UseInterceptors(CacheInterceptor)
export class CountController {
    constructor(private readonly httpService: HttpService) { }

    @Get('area')
    async area() {
        try {
            const { data } = await this.httpService.get('https://service-n9zsbooc-1252957949.gz.apigw.tencentcs.com/release/qq').toPromise();
            return data.data.wuwei_ww_area_counts;
        } catch (err) {
            return [];
        }
    }

    @Get('total')
    async total() {
        try {
            const { data } = await this.httpService.get('https://service-n9zsbooc-1252957949.gz.apigw.tencentcs.com/release/qq').toPromise();
            return data.data.wuwei_ww_global_vars;
        } catch (err) {
            return [];
        }
    }

}
