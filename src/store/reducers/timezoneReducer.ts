import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITimezone } from '../../interfaces/Timezone'
import { getTimezones, getTimezonesFromFile } from '../actions/timezone/get'

interface TimezoneState {
    timezones: ITimezone[]
    loading: boolean
    error: string
}
const initialState: TimezoneState = {
    timezones: [],
    loading: false,
    error: ''
}

export const timezoneSlice = createSlice({
    name: 'timezone',
    initialState,
    reducers: {},
    extraReducers: {
        [getTimezones.pending.type]: (state) => {
            state.loading = true
            state.error = ''
        },
        [getTimezones.fulfilled.type]: (state, action: PayloadAction<ITimezone[]>) => {
            state.loading = false
            state.timezones = action.payload
        },
        [getTimezones.rejected.type]: (state, action: PayloadAction<any, any, any, Error>) => {
            state.loading = true
            state.error = action.error.message
            state.timezones = []
        },
        [getTimezonesFromFile.pending.type]: (state) => {
            state.loading = true
            state.error = ''
        },
        [getTimezonesFromFile.fulfilled.type]: (state, action: PayloadAction<ITimezone[]>) => {
            state.loading = false
            state.timezones = action.payload
        },
        [getTimezonesFromFile.rejected.type]: (state, action: PayloadAction<any, any, any, Error>) => {
            state.loading = true
            state.error = action.error.message
        },
    }
})


export const timezoneReducer = timezoneSlice.reducer