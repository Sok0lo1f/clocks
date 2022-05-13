import { combineReducers } from 'redux'
import { timezoneReducer } from './timezoneReducer'

export const rootReducer = combineReducers({
    timezoneReducer
})


export type RootState = ReturnType<typeof rootReducer>