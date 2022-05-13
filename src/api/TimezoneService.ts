import axios from 'axios'
import { ITimezone } from '../interfaces/Timezone'

export class TimezoneService {
    readonly URL = 'http://myjson.dit.upm.es/api/bins/62kn'

    get = async() => {
        try { 
            const timezones = await axios.get<ITimezone[]>(this.URL)
            return timezones.data
        } catch (e: any) {
            throw new Error(e) 
        }
    }
}