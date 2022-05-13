import React, { useEffect, useState } from 'react'
import './App.scss'
import { ClockCard } from './components/ClockCard/ClockCard'
import { v4 as uuidv4 } from 'uuid'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'
import { Loader } from './components/UI/Loader/Loader'

const App = () => {
    const [clocks, setClocks] = useState<string[]>([uuidv4(), uuidv4()])
    const addClock = () => {
        if (clocks.length > 24) return
        setClocks((prev) => [...prev, uuidv4()])
    }
    const removeClock = (id: string) => {
        setClocks((prev) => prev.filter((p) => p !== id))
    }

    const { getTimezones, getTimezonesFromFile } = useActions()
    const { loading, timezones } = useTypedSelector(
        (state) => state.timezoneReducer
    )

    useEffect(() => {
        getTimezones()
    }, [])

    if (loading)
        return (
            <div className='clock-app'>
                <Loader />
            </div>
        )
    if (timezones.length === 0)
        return (
            <div className='clock-app'>
                <button
                    className='clock-app__clock-add'
                    onClick={() => getTimezonesFromFile()}>
                    Получить из локального файла
                </button>
            </div>
        )
    return (
        <div className='clock-app'>
            {clocks.map((clockId) => (
                <div className='clock-app__clock' key={clockId}>
                    <ClockCard timezones={timezones} />
                    <button
                        className='clock-app__clock-remove'
                        onClick={() => removeClock(clockId)}>
                        -
                    </button>
                </div>
            ))}
            <button className='clock-app__clock-add' onClick={addClock}>
                Добавить
            </button>
        </div>
    )
}

export default App
