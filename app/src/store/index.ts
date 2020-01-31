import { observable, action } from 'mobx'
import { request } from '../utils/request'
import { Banner } from './types.d'

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
  @observable newsList = [
    { title: "北京新增一例", source: "百度辟谣", cover: "" },
  ]
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
  openAction = () => { this.isActionOpen = true }

  @action
  closeAction = () => { this.isActionOpen = false }

  @action
  setLoading3 = (v: boolean) => { this.loading3 = v }

  @action
  setLoading4 = (v: boolean) => { this.loading3 = v }

  @action
  setSticky = (v: boolean) => { this.sticky = v }

  fetchBanners = async () => {
    try {
      const res = await request('/banners');
      const banners = (res as Banner[]).map(i => i.url.url);
      this.setBanners(banners);
    } catch (err) {
      console.log('err', err)
    }
  }

  init = async () => {
    await this.fetchBanners();
  }

}

export default new IndexStore()
