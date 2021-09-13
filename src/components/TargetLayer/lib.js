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

export default {}
