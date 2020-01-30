import Taro from '@tarojs/taro'

export const request = (url: string): Promise<any> => {
    return Taro.request({
        url: 'http://localhost:1337' + url
    }).then(res => res.data)
}