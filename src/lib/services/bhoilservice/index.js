import { UIFetch } from "../uifetch"

export function fetchBHOilPlatform() {
    return UIFetch({
        url: 'FETCH_BHOIL_PLATFORM'
    })
}

export function fetchBHOilTubing() {
    return UIFetch({
        url: 'FETCH_BHOIL_TUBING'
    })
}

export default {
    fetchBHOilPlatform,
    fetchBHOilTubing
}
