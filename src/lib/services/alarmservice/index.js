export function fetchAlarmArea(params) {
    return fetch('/self/target/area/new/page', {
        body: JSON.stringify({
            current: 1,
            size: 1000
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + process.env.HLX_ACCESS_TOKEN
        },
    }).then(res => {
        return res.json()
    }).then(res => {
        return (res && res.code === 0) ? res.data.records : []
    })
}

export default {
    fetchAlarmArea
}
