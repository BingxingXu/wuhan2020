import Taro from '@tarojs/taro'

export const request = (url: string): Promise<any> => {
    return Taro.request({
        url: '//49.235.78.43:3000' + url
    }).then(res => res.data)
}