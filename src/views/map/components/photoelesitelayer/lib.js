import { getLonAndLats } from '@/lib/tools'

export function fetchPhotoEleSite(params) {
    return fetch('/self/cctv/camera/list', {
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

export function formatPolygonData(info) {
    let res = info.resCameraStatus
    if (!res.pan || !res.viewHorizon) return
    let cctvLat = info.latitude, cctvLon = info.longitude, tvid = info.cameraId;

    let tilt = Math.abs(res.tilt); // 倾斜角
    let cctvRadius = info.height / (Math.tan(tilt)) // 可见范围的长度
    let viewHorizon = Number((180 / Math.PI * Number(res.viewHorizon)).toFixed(8)); //水平视场角
    let pan = Number((180 / Math.PI * Number(res.pan)).toFixed(8)); //水平角
    pan = pan < 0 ? pan = 180 + (180 + pan) : pan

    let edge1 = pan - (viewHorizon / 2); // 第一个边的角度;
    let edge2 = pan + (viewHorizon / 2); // 第二个边的角度;

    let point1 = getLonAndLats(cctvLon, cctvLat, edge1, cctvRadius); //第一个边顶点位置
    let point2 = getLonAndLats(cctvLon, cctvLat, edge2, cctvRadius); //第二个边顶点位置
    let point3 = [(point2[0] + point1[0]) / 2, (point2[1] + point1[1]) / 2]; //第三点的位置

    let pointLine = [[cctvLon, cctvLat], point3] // 指向线两段位置   ,fromLonLat([cctvlon,cctvlat]),fromLonLat(point3)
    let pointList = [[cctvLon, cctvLat], point1, point2] // 光电覆盖扇形范围

    return {
        ...info,
        polygon: pointList,
        polyline: pointLine
    }
}
