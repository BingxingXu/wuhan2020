import { observable, action } from 'mobx'
import { request } from '../utils/request'
import { Banner } from './types.d'

class IndexStore {
  @observable banners = [
    "minx.oss-cn-shanghai.aliyuncs.com/strapi/51a96117964a49f1b5fcc18951b3dc14.jpeg",
    "minx.oss-cn-shanghai.aliyuncs.com/strapi/f4e319f5916e48aa870e9335a2387cf4.jpeg"
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
    "向一线的勇士致敬",
    "不信谣，不传谣"
  ];
  @observable newsList = [
    { title: "北京新增一例", source: "百度辟谣", cover: "" },
  ]
  @observable loading3 = true
  @observable loading4 = true

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
