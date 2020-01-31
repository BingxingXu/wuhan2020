import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './style.scss'

export const Loading = () => {
    return (
        <View className="loading">
            <img src="//minx.oss-cn-shanghai.aliyuncs.com/wuhan/loading.png" />
            <Text>加载中</Text>
        </View>
    )
}