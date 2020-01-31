import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { useInterval } from '../../utils/useInterval'
import "./style.scss"

const data = [
    "向一线的勇士致敬",
    "不信谣，不传谣，我为中国加油",
    "一切安好！大家都要好好的",
    "身体健康，宅在家里做贡献",
    "1身体健康，宅在家里做贡献",
    "2身体健康，宅在家里做贡献",
    "3身体健康，宅在家里做贡献",
    "4身体健康，宅在家里做贡献",
    "5身体健康，宅在家里做贡献",
    "6身体健康，宅在家里做贡献"
]

export const Danmu = () => {
    const [list, setList] = useState([] as string[])
    useInterval(() => {
        const index = Math.floor(Math.random() * 10);
        const text = data[index];
        let newList: string[] = [];
        if (list.length > 3) {
            newList = [...list.slice(0, 2), text]
        } else {
            newList = [...list, text]
        }
        setList(newList);
    }, 1500)
    return (
        <View className="danmu-container">
            <View className="danmu-group">
                {list.map((i, index) => (
                    <View className="danmu-item" key={index}>
                        {i}
                    </View>
                ))}
            </View>
        </View>
    )
}