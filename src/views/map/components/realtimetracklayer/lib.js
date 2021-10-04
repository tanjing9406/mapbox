export function formatBoundsToPointList(bounds) {
    // 左上，右上，右下，左下
    const [minX, minY, maxX, maxY] = bounds
    return [
        { lat: maxY, lon: minX },
        { lat: maxY, lon: maxX },
        { lat: minY, lon: maxX },
        { lat: minY, lon: minX },
    ]
}

export function sendWsMessage(ws, params) {
    const { targetIdList } = params
    const shipsRule = {
        targetIdList
    }
    console.log(targetIdList)
    let data = JSON.stringify(shipsRule)
    ws.send(data)
}
