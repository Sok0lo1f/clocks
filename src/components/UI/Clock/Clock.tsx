import React, { FC, useEffect, useRef } from 'react'
import './Clock.scss'

interface ClockProps {
    second: number
    minute: number
    hour: number
}
export const Clock: FC<ClockProps> = ({ second, minute, hour }) => {
    const minHandRef = useRef<HTMLDivElement>(null)
    const secondHandRef = useRef<HTMLDivElement>(null)
    const hourHandRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        secondHandRef.current?.style.setProperty(
            'transform',
            `rotate(calc(-90deg + ${second * 6}deg))`
        )
    }, [second])

    useEffect(() => {
        minHandRef.current?.style.setProperty(
            'transform',
            `rotate(calc(-90deg + ${minute * 6}deg))`
        )
    }, [minute])

    useEffect(() => {
        const hValue = (hour * 100 + minute) / 100
        hourHandRef.current?.style.setProperty(
            'transform',
            `rotate(calc(-90deg + ${hValue * 30}deg))`
        )
    }, [hour, minute])

    return (
        <div className='clock'>
            <div ref={secondHandRef} className='second'></div>
            <div ref={minHandRef} className='min'></div>
            <div ref={hourHandRef} className='hour'></div>
            <div className='clock__streak zero'></div>
            <div className='clock__streak one'></div>
            <div className='clock__streak two'></div>
            <div className='clock__streak three'></div>
            <div className='clock__streak four'></div>
            <div className='clock__streak five'></div>
            <div className='clock__streak six'></div>
            <div className='clock__streak seven'></div>
            <div className='clock__streak eight'></div>
            <div className='clock__streak nine'></div>
            <div className='clock__streak ten'></div>
            <div className='clock__streak eleven'></div>
        </div>
    )
}
