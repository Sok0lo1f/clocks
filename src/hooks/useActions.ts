import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TimezoneActions } from '../store/actions/timezone'
import { AppDispatch } from '../store/store'

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators({
        ...TimezoneActions
    }, dispatch)
}