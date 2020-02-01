import Taro from '@tarojs/taro'

export const request = (url: string): Promise<any> => {
    return Taro.request({
        url: '//wuhan.90hub.com/api' + url
    }).then(res => res.data)
}