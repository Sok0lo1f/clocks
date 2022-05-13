import { createAsyncThunk } from '@reduxjs/toolkit'
import { TimezoneService } from '../../../api/TimezoneService'
import timezonesJson from '../../../utils/timezones.json'
export const getTimezones = createAsyncThunk('timezone/get', async() => {
    const api = new TimezoneService()
    const timezones = await api.get()
    return timezones
})

export const getTimezonesFromFile = createAsyncThunk('timezone/getFromFile', () => {
    return timezonesJson
})