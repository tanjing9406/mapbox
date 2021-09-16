export function fetchTargetTrack(params) {
    return fetch('/self/target/trackByZoom', {
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

export function addOrDelete(sets, val) {
    if (sets.has(val)) {
        sets.delete(val)
    } else {
        sets.add(val)
    }
    return sets
}

export function sendWsMessage(ws, params) {
    const { provinceList } = params
    const shipsRule = {
        "targetType": [
            "All"
        ],
        "pointList": [
            {
                "lat": 42.31027951280584,
                "lon": 77.7183596078416
            },
            {
                "lat": 42.31027951280584,
                "lon": 140.5499629701822
            },
            {
                "lat": -3.952562348328407,
                "lon": 140.5499629701822
            },
            {
                "lat": -3.952562348328407,
                "lon": 77.7183596078416
            }
        ],
        "areaList": [],
        "zoom": 12,
        "targetIdList": [],
        "provinceList": provinceList
    }
    let data = JSON.stringify(shipsRule)
    ws.send(data)
}

export default {}
