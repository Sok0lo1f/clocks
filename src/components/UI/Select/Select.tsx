import React, { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import './Select.scss'

export interface ISelectOptions {
    id: number | string
    value: string
}
interface SelectProps {
    options: ISelectOptions[]
    defaultValue?: ISelectOptions
    onChange: (value: ISelectOptions) => void
    className?: string
}

export const Select: FC<SelectProps> = ({
    options,
    defaultValue = {
        id: -1,
        value: '',
    },
    onChange,
    className = '',
}) => {
    const [selectedItem, setSelectedItem] = useState(defaultValue)
    const [btnValue, setBtnValue] = useState(selectedItem?.value)
    const [isListVisible, setListVisible] = useState(false)

    const selectRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (e: MouseEvent) => {
        if (selectRef.current?.contains(e.target as Node)) return
        setListVisible(false)
    }

    useEffect(() => {
        if (isListVisible)
            document.addEventListener('mousedown', handleClickOutside)
        else document.removeEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isListVisible])

    const ddListStyles = classNames({
        dropdown__list: true,
        'dropdown__list--visible': isListVisible,
    })

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement
        target.focus()
        setListVisible((prev) => !prev)
    }

    const handleListClick = (e: any) => {
        e.stopPropagation()
        const { id, value } = e.target.dataset
        setSelectedItem({ id, value })
        setBtnValue(value)

        setListVisible(false)
        onChange({ id, value })
    }
    return (
        <div className={`dropdown ${className}`} ref={selectRef}>
            <button className='dropdown__button' onClick={handleBtnClick}>
                {btnValue}
                <div className='dropdown__button-icon'>➩</div>
                <ul className={ddListStyles}>
                    {options.map((option, index) => {
                        return (
                            <li
                                key={`${JSON.stringify(option)}`}
                                className='dropdown__list-item'
                                data-id={option.id}
                                data-value={option.value}
                                onClick={handleListClick}>
                                {option.value}
                            </li>
                        )
                    })}
                </ul>
            </button>
        </div>
    )
}
