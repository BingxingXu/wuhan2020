import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, Canvas } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtIcon, AtMessage, AtTabs, AtTabsPane, AtButton, AtActionSheet, AtActionSheetItem, AtCard, AtList, AtListItem } from 'taro-ui'
import { CommonEvent } from '@tarojs/components/types/common'

import './index.scss'
import { Barrage } from '../../components/barrage';

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
    setLoading3: (v: boolean) => {},
    setLoading4: (v: boolean) => {},
    init: () => {},
    setCurrentTab: (index: number, event: CommonEvent) => {},
    openAction: () => {},
    closeAction: () => {},
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
    this.initBarrage();
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

  render() {
    const { indexStore: { currentTab,
      tabList, setCurrentTab, isActionOpen,
      openAction, closeAction, actionList,
      newsList, banners, setLoading3, loading3
    } } = this.props
    return (
      <View >
        <AtMessage />
        <canvas
          className="barrage"
          id="canvas"
          height="300"
          width="700"
        >
          您的浏览器不支持canvas标签。
        </canvas>
        {/* banner */}
        <Swiper
          className="banner"
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
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
            <AtIcon value="heart" size='30' color='#D8D8D8' />
            <Text>理赔服务</Text>
          </View>
          <View>
            <AtIcon value="heart" size='30' color='#D8D8D8' />
            <Text>保全服务</Text>
          </View>
          <View>
            <AtIcon value="heart" size='30' color='#D8D8D8' />
            <Text>健康门诊</Text>
          </View>
          <View>
            <AtIcon value="heart" size='30' color='#D8D8D8' />
            <Text>医护人员险</Text>
          </View>
        </View>
        <View className="banner-hints">
          <Text >疫情严峻，减少人员聚集，平安人寿为您提供</Text>
        </View>

        {/* 按钮 */}
        {/* tabs */}
        <AtTabs current={currentTab} tabList={tabList} onClick={setCurrentTab}>
          <AtTabsPane current={currentTab} index={0} >
            <iframe
              ref="imap"
              seamless
              width="100%"
              height="400px"
              scrolling="auto"
              src="//192.168.0.61:1234/"
              onLoad={this.onLoadMap}
            />
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
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
        {/* 祈福按钮 */}
        <View className='at-row bottom-view'>
          <AtButton type='secondary' circle className="at-col at-col-3">分享</AtButton>
          <AtButton type='primary' circle className="at-col at-col-8" onClick={openAction}>我要祈福</AtButton>
        </View>
        <AtActionSheet isOpened={isActionOpen} cancelText='取消' title='点击发送吉祥语' onClose={closeAction}>
          {actionList.map((i, index) =>
            <AtActionSheetItem key={index} onClick={this.handleClickAction}>
              {i}
            </AtActionSheetItem>
          )}
        </AtActionSheet>
        <View className="place-holder" />
      </View>
    )
  }
}

export default Index as ComponentType
