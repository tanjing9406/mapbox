import { UIFetch } from "../uifetch"

export function fetchAlarmArea() {
    return UIFetch({
        url: 'FETCH_ALARM_AREA',
        params: {
            current: 1,
            size: 1000
        },
        mapToFE: data => data.records
    })
}

export default {
    fetchAlarmArea
}
