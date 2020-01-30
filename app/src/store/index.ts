import { observable, action } from 'mobx'
import { request } from '../utils/request'
import { Banner } from './types.d'

class IndexStore {
  @observable banners = [];
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
    { title: "北京新增一例", source: "百度辟谣", cover: "https://source.unsplash.com/random/223x156" },
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
