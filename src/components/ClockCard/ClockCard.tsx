import React, { FC, useEffect, useState } from 'react'
import { ITimezone } from '../../interfaces/Timezone'
import { converDateToString } from '../../utils/convertDateToString'
import { Clock } from '../UI/Clock/Clock'
import { ISelectOptions, Select } from '../UI/Select/Select'
import './ClockCard.scss'

interface ClockCardProps {
    timezones: ITimezone[]
}
export const ClockCard: FC<ClockCardProps> = ({ timezones }) => {
    const [toDay, setToDay] = useState(new Date())
    const [timezone, setTimezone] = useState(+timezones[0].timezone)

    useEffect(() => {
        const interval = setInterval(() => {
            setToDay(new Date())
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [])
    const onSelectChangeHandler = (value: ISelectOptions) => {
        setTimezone(+value.id)
    }

    return (
        <div className='clock-card'>
            <div className='clock-card__clock'>
                <Clock
                    minute={toDay.getUTCMinutes()}
                    second={toDay.getUTCSeconds()}
                    hour={(toDay.getUTCHours() + timezone) % 24}
                />
            </div>
            <div className='clock-card__digit-time'>
                {converDateToString(toDay, timezone)}
            </div>
            <div className='clock-card__select'>
                <Select
                    options={timezones.map((o) => ({
                        id: o.timezone,
                        value: o.name,
                    }))}
                    defaultValue={{
                        id: timezones[0].timezone,
                        value: timezones[0].name,
                    }}
                    onChange={onSelectChangeHandler}
                />
            </div>
        </div>
    )
}
