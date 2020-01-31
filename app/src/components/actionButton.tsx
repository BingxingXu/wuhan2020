import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

interface IProps {
    text: string
    onClick: Function
}

export const ActionButton = (props: IProps) => {
    const [counDown, setCountDown] = useState(60);

    return (
        <View className="action-item">
            <Text>{props.text}</Text>
            <Text>发送</Text>
        </View>
    )

}
