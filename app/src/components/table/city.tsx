import Taro, { useState } from '@tarojs/taro';
import { AtList, AtListItem, AtAccordion } from 'taro-ui'


interface City {
    name: string
    confirm: number,
    suspect: number,
    dead: number,
    heal: number
}

interface Area {
    name: string
    confirm: number,
    suspect: number,
    dead: number,
    heal: number
    cities: City[]
}

interface ListProps {
    area: Area
}

export const City = (props: ListProps) => {
    const { area } = props;
    const [open, setOpen] = useState(false)
    return (
        <AtAccordion
            open={open}
            onClick={() => { setOpen(!open) }}
            title={area.name}
        >
            <AtList hasBorder={false}>
                {area.cities.map((city, index) => (
                    <AtListItem
                        title={city.name}
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                    />
                ))}
            </AtList>
        </AtAccordion>
    )
}
