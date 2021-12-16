const TARGET_URL_CONFIG = {
    FETCH_TARGET_TRACK: {
        method: 'POST',
        url: '/self/target/trackByZoom'
    },
    FETCH_TARGET_TRACK_INTIME: {
        method: 'POST',
        url: '/self/target/track/condition'
    },
    SEARCH_TARGET: {
        method: 'GET',
        url: '/self/target/search/info'
    }
}

export default TARGET_URL_CONFIG
