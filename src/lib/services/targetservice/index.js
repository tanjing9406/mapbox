import { UIFetch } from "../uifetch"

export function fetchTargetTrack(params) {
    return UIFetch({
        url: 'FETCH_TARGET_TRACK',
        params
    })
}

export function fetchTargetTrackInTime(params = {}) {
    return UIFetch({
        url: 'FETCH_TARGET_TRACK_INTIME',
        params
    })
}

export function searchTarget(search) {
    return UIFetch({
        url: 'SEARCH_TARGET',
        params: { search }
    })
}

export default {
    fetchTargetTrack,
    fetchTargetTrackInTime,
    searchTarget
}
