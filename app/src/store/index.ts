import { observable, action } from 'mobx'
import { request } from '../utils/request'
import { Banner, CountTotal, News } from './types.d'

class IndexStore {
  @observable banners = [
    "minx.oss-cn-shanghai.aliyuncs.com/wuhan/banner.png"
  ];
  @observable currentTab = 0;
  @observable tabList = [
    { title: '疫情概览' },
    { title: '防护科普' },
    { title: '保险理赔' },
    { title: '平安行动' }
  ];
  @observable isActionOpen = false
  @observable actionList = [
    "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/%E5%90%89%E7%A5%A5%E8%AF%AD01.png",
    "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/%E5%90%89%E7%A5%A5%E8%AF%AD02.png",
    "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/%E5%90%89%E7%A5%A5%E8%AF%AD03.png",
    "//minx.oss-cn-shanghai.aliyuncs.com/wuhan/%E5%90%89%E7%A5%A5%E8%AF%AD04.png",
  ];
  @observable newsList: News[] = []
  @observable loading3 = true
  @observable loading4 = true
  @observable virus = [
    {
      "country": "中国",
      "area": "湖北",
      "city": "武汉",
      "confirm": 2261,
      "suspect": 0,
      "dead": 129,
      "heal": 51
    }
  ]
  @observable countTotal: CountTotal = {
    confirmCount: 0,
    suspectCount: 0,
    deadCount: 0,
    cure: 0,
    updateTime: new Date("2020-01-30 17:47"),
    recentTime: new Date("2020-01-30 17:47")
  }

  @observable sticky = false

  @action
  setBanners = v => {
    this.banners = v;
  }

  @action
  setCurrentTab = v => {
    this.currentTab = v;
  }

  @action
  setNewsList = (v: News[]) => { this.newsList = v }
  @action
  openAction = () => { this.isActionOpen = true }

  @action
  closeAction = () => { this.isActionOpen = false }

  @action
  setLoading3 = (v: boolean) => { this.loading3 = v }

  @action
  setLoading4 = (v: boolean) => { this.loading3 = v }

  @action
  setSticky = (v: boolean) => { this.sticky = v }

  @action
  setCountTotal = (v: CountTotal) => { this.countTotal = v }

  fetchBanners = async () => {
    try {
      const res = await request('/banners');
      const banners = (res as Banner[]).map(i => i.url);
      this.setBanners(banners);
    } catch (err) {
      console.log('fetchBanners error', err)
    }
  }

  fetchCountTotal = async () => {
    try {
      const res = await request('/counts/total');
      const total = (res as CountTotal[])[0];
      this.setCountTotal(total);
    } catch (err) {
      console.log("fetchCountTotal error", err)
    }
  }

  fetchNews = async () => {
    try {
      const res = await request('/news');
      this.setNewsList(res as News[]);
    } catch (err) {
      console.log("fetchNews", err)
    }
  }

  init = async () => {
    await this.fetchBanners();
    await this.fetchCountTotal();
    await this.fetchNews();
  }

}

export default new IndexStore()
