export const converDateToString = (date: Date, timezone: number) => {
    const h = (date.getUTCHours() + timezone) % 24
    const m = date.getUTCMinutes()
    const s = date.getUTCSeconds()

    return `${h > 9 ? h : `0${h}`}:${m > 9 ? m : `0${m}`}:${s > 9 ? s : `0${s}`}`
}