import { UIFetch } from "../uifetch"

export function fetchAISSite(params) {
    return UIFetch({
        url: 'FETCH_AIS_SITE',
        params
    })
}

export function fetchAISSiteDetail(aisId) {
    return UIFetch({
        url: 'FETCH_AIS_SITE_DETAIL',
        params: { aisId }
    })
}

export function fetchPhotoEleSite(params) {
    return UIFetch({
        url: 'FETCH_PHOTO_ELE_SITE',
        params
    })
}

export function fetchRadarSite(params) {
    return UIFetch({
        url: 'FETCH_RADAR_SITE',
        params
    })
}

export function fetchRadarSiteDetail(radarId) {
    return UIFetch({
        url: 'FETCH_RADAR_SITE_DETAIL',
        params: { radarId }
    })
}

export default {
    fetchAISSite,
    fetchAISSiteDetail,
    fetchPhotoEleSite,
    fetchRadarSite,
    fetchRadarSiteDetail
}
