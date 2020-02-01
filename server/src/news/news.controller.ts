import { Controller, Get, HttpService, UseInterceptors, CacheInterceptor } from '@nestjs/common';

interface News {
    sourceId: string;
    url: string;
    content: string;
    sendTime: string;
    fromName: string;
}

@Controller('news')
@UseInterceptors(CacheInterceptor)
export class NewsController {
    constructor(private readonly httpService: HttpService) { }

    @Get()
    async area() {
        try {
            const page = 0;
            const { data } = await this.httpService.get(`http://ncov.news.dragon-yuan.me/api/news?search=&page=${page}`).toPromise();
            const list = (data.result.list as News[]).map(
                i => {
                    const a = i.content.split('【')[1];
                    const b = i.content.split('】')[0] + '】';
                    return ({ ...i, title: b });
                }
            )
            return list
        } catch (err) {
            console.log('err', err)
            return [];
        }
    }
}
