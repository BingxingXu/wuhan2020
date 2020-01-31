import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { useInterval } from '../../utils/useInterval'
import "./style.scss"

const data = [
    "向一线的勇士致敬",
]

export const Danmu = () => {
    const [count, setCount] = useState(0);
    useInterval(() => {
        console.log(count)
        setCount(count + 1);
    }, 1000)
    return (
        <View className="danmu-container">
            <View className="danmu-item">
                向一线的勇士致敬！
            </View>
        </View>
    )
}