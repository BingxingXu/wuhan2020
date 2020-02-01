import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, Canvas } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtDivider, AtTabBar, AtIcon, AtMessage, AtTabs, AtTabsPane, AtButton, AtActionSheet, AtActionSheetItem, AtCard, AtList, AtListItem, AtAccordion } from 'taro-ui'
import { CommonEvent } from '@tarojs/components/types/common'
import { format } from 'date-fns';

import './index.scss'
import { Barrage } from '../../components/barrage';
import { Area } from '../../components/table';
import { Loading } from '../../components/loading';
import { Danmu } from '../../components/danmu';
import { logEnter } from '../../utils/log'
import { CountTotal } from '../../store/types.d';

type PageStateProps = {
  indexStore: {
    currentTab: number,
    tabList: { title: string; }[],
    isActionOpen: boolean,
    banners: string[],
    actionList: [string],
    newsList: { title: string; source: string; cover: string; }[],
    loading3: boolean,
    loading4: boolean,
    sticky: boolean,
    countTotal: CountTotal,
    setLoading3: (v: boolean) => {},
    setLoading4: (v: boolean) => {},
    init: () => {},
    setCurrentTab: (index: number, event: CommonEvent) => {},
    openAction: () => {},
    closeAction: () => {},
    setSticky: (v: boolean) => {}
  }
}

interface Index {
  props: PageStateProps;
}

@inject('indexStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
    this.props.indexStore.init();
    // this.initBarrage();
    this.stickHead();
    logEnter();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClickAction = () => {
    Taro.atMessage({
      'message': '发送成功',
      'type': 'success',
    })
  }

  onLoadMap = () => { }

  initBarrage = () => {
    let barrage = new Barrage('canvas');
    barrage.draw();

    const textList = ['弹幕', '666', '233333333',
      'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
      'Angular', '测试弹幕效果'
    ];

    textList.forEach((t) => {
      barrage.shoot(t);
    })
  }

  stickHead = () => {
    const { indexStore: { setSticky } } = this.props
    document.onscroll = function () {
      var distance = document.body.scrollTop || document.documentElement.scrollTop;
      if (distance > 500) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
  }

  render() {
    const { indexStore: { currentTab,
      tabList, setCurrentTab, isActionOpen,
      openAction, closeAction, actionList,
      newsList, banners, setLoading3, loading3,
      sticky, countTotal,
    } } = this.props
    return (
      <View >
        <AtMessage />
        <Danmu />
        <Swiper
          className="banner"
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
        >
          {banners.map((i, index) =>
            <SwiperItem key={index}>
              <Image
                src={'//' + i}
                mode="aspectFill"
                lazyLoad
                className="banner-img"
              />
            </SwiperItem>
          )}
        </Swiper>
        <View className="banner-btns">
          <View>
            <Image src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon1.png" />
            <Text>理赔服务</Text>
          </View>
          <View>
            <Image src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon2.png" />
            <Text>保全服务</Text>
          </View>
          <View>
            <Image src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon3.png" />
            <Text>健康门诊</Text>
          </View>
          <View>
            <Image
              style={{
                marginTop: "16px",
                marginBottom: "4px"
              }}
              src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon4-1.png" />
            <Text>医护人员险</Text>
          </View>
        </View>
        <View className="banner-hints">
          <Text >疫情严峻，减少人员聚集，平安人寿为您提供</Text>
        </View>

        {/* 按钮 */}
        {sticky ? <AtTabBar
          className="sticky-header"
          backgroundColor='#287FFC'
          color='#fff'
          tabList={tabList}
          onClick={setCurrentTab}
          current={currentTab}
        /> : null}
        {/* tabs */}
        <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
          <AtTabsPane current={currentTab} index={0} >
            <View className="map-source">
              <Text>数据来源： 卫健委/央视新闻，更新至：{format(new Date(countTotal.updateTime), 'yyyy-MM-dd hh:mm:ss')}</Text>
            </View>
            <View className="virus-total">
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "rgba(255,81,24,1)" }}>{countTotal.confirmCount}</Text>
                <Text className="virus-hint">确诊病例</Text>
              </View>
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "#FF8718" }}>{countTotal.suspectCount}</Text>
                <Text className="virus-hint">疑似病例</Text>
              </View>
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "#00BC56" }}>{countTotal.cure}</Text>
                <Text className="virus-hint">治愈病例</Text>
              </View>
              <View className="virus-col">
                <Text className="virus-number" style={{ color: "#666666" }}>{countTotal.deadCount}</Text>
                <Text className="virus-hint">死亡病例</Text>
              </View>
            </View>
            <AtDivider className="divider" />
            <View className="map-header">
              <img src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon6.png" />
              <Text className="title">全国疫情地图</Text>
            </View>
            <iframe
              frameborder={0}
              border="0"
              marginwidth="0"
              marginheight="0"
              ref="imap"
              seamless
              width="100%"
              height="400px"
              scrolling="auto"
              src="//49.235.78.43:1234/"
              onLoad={this.onLoadMap}
              className="map"
            />
            <View className="virus-detail ">
              <Area />
            </View>
          </AtTabsPane>
          {/* 防护科普 */}
          <AtTabsPane current={currentTab} index={1}>
            <AtList>
              {newsList.map((i, index) =>
                <AtListItem
                  key={index}
                  title={i.title}
                  note={i.source}
                  thumb={i.cover}
                />
              )}
            </AtList>
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={2}>
            <Text style={loading3 ? {} : { display: 'none' }}>Loading....</Text>
            <iframe
              seamless
              width="100%"
              height="400px"
              scrolling="auto"
              src="//www.bing.com"
              onLoad={() => { setLoading3(false) }}
              style={loading3 ? { display: 'none' } : {}}
            />
          </AtTabsPane>
          <AtTabsPane current={currentTab} index={3}>
            <Loading />
          </AtTabsPane>
        </AtTabs>
        {/* 祈福按钮 */}
        <View className='at-row bottom-view'>
          <AtButton type='secondary' circle className="at-col at-col-3">分享</AtButton>
          <AtButton type='primary' circle className="at-col at-col-8" onClick={openAction}>我要祈福</AtButton>
        </View>
        <AtActionSheet isOpened={isActionOpen} cancelText='取消' title='点击发送吉祥语' onClose={closeAction}>
          {actionList.map((i, index) =>
            <AtActionSheetItem
              className="action-item"
              key={index}
              onClick={this.handleClickAction}
            >
              <img src={i} />
              {/* <View className="action-item_text">
                <Text>发送</Text>
              </View> */}
            </AtActionSheetItem>
          )}
        </AtActionSheet>
        <AtDivider className="divider" />
        <View className="place-holder" />
      </View>
    )
  }
}

export default Index as ComponentType
