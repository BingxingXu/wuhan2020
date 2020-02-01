import Taro, { useEffect, useState } from '@tarojs/taro'
import { Map } from './map'
import provinces from './area.json'


export const IMap = () => {
    const [province, _setProvince] = useState(null)

    return (
        <div>
            <Map province={province} data={data} />
        </div>
    )
}