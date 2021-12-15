export function fetchBHOilPlatform(params) {
    return fetch('/self/target/area/new/geo-objects/point', {
        method: 'GET',
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

export function fetchBHOilTubing(params) {
    return fetch('/self/target/area/new/linestring-buffer-com', {
        method: 'GET',
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

export default {
    fetchBHOilPlatform,
    fetchBHOilTubing
}
