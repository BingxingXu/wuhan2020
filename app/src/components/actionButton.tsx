import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

interface IProps {
    url: string
    onClick: Function
}

export const ActionButton = (props: IProps) => {
    const [counDown, setCountDown] = useState(60);

    return (
        <View className="action-item">
            <Image src={props.url} />
            <Text>发送</Text>
        </View>
    )

}
