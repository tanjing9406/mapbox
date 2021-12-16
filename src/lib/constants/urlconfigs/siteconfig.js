const SITE_URL_CONFIG = {
    FETCH_AIS_SITE: {
        method: 'POST',
        url: '/self/target/ais/site/page'
    },
    FETCH_AIS_SITE_DETAIL: {
        method: 'GET',
        url: '/self/target/ais/byId'
    },
    FETCH_PHOTO_ELE_SITE: {
        method: 'POST',
        url: '/self/cctv/camera/list'
    },
    FETCH_RADAR_SITE: {
        method: 'POST',
        url: '/self/target/radar/site/page'
    },
    FETCH_RADAR_SITE_DETAIL: {
        method: 'GET',
        url: '/self/target/radar/byId'
    }
}

export default SITE_URL_CONFIG
