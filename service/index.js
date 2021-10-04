const WebSocket = require('ws')
const { createClient } = require('redis')

const REDIS_SERVER = "redis://:hlxredis@10.100.0.127:6379"
const WEB_SOCKET_PORT = 3000

const client = createClient({ url: REDIS_SERVER });
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT })

client.on('error', (err) => console.log('Redis Client Error', err))
client.connect()

const getSingleTrack = async (id) => {
    let path = []
    let timestamps = []
    let dateList = []
    let data = await client.LRANGE(`track:${id}`, 0, 2000)
    if (!data[0]) return { path, timestamps, dateList }
    // console.log(data)
    data.forEach((point) => {
        const p = JSON.parse(point)
        // console.log(p)
        const coordinate = [p.longitude, p.latitude]
        const timestamp = new Date(p.lastDt).getTime()
        path.push(coordinate)
        timestamps.push(timestamp)
        dateList.push(p.lastDt)
    })
    // console.log(path)
    const { vesselName, targetId } = JSON.parse(data[0])
    return {
        properties: { shipName: vesselName, targetId },
        path: path.reverse(),
        timestamps: timestamps.reverse(),
        dateList: dateList.reverse()
    }
}

server.on('connection', function connection(ws) {
    console.log('WebSocket connected!')
    ws.on('message', async function incoming(message) {
        console.log('received: %s', JSON.parse(message).targetIdList);
        const targetList = JSON.parse(message).targetIdList
        const tracks = await Promise.all(targetList.map(async (id) => {
            const track = await getSingleTrack(id)
            return track;
        }))
        ws.send(JSON.stringify(tracks))
    });

})