export function fetchRadarSite(params) {
    return fetch('/self/target/radar/site/page', {
        body: JSON.stringify(params),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + process.env.HLX_ACCESS_TOKEN
        },
    }).then(res => {
        return res.json()
    }).then(res => {
        return (res && res.code === 0) ? res.data : []
    })
}

export function fetchRadarSiteDetail(radarId) {
    return fetch('/self/target/radar/byId?' + new URLSearchParams({ radarId }), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + process.env.HLX_ACCESS_TOKEN
        },
    }).then(res => {
        return res.json()
    }).then(res => {
        return (res && res.code === 0) ? res.data : {}
    })
}
