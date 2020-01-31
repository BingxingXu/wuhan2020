import Taro, { useState } from '@tarojs/taro';
import { AtList, AtListItem } from 'taro-ui';
import { View, Text } from '@tarojs/components'

import { City } from './city';
import './style.scss';

const mock = [
    {
        country: "中国",
        area: "湖北",
        city: "武汉",
        confirm: 2261,
        suspect: 0,
        dead: 129,
        heal: 51
    },
]

export const Area = () => {
    return (
        <View className="area">
            <img src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/icon5.png" />
            <Text className="title">全国疫情详细数据</Text>
            <View className="at-row header-row">
                <Text>地区</Text>
                <Text>确证人数</Text>
                <Text>死亡</Text>
                <Text>治愈</Text>
            </View>
        </View>
    )
}

