const WebSocket = require('ws')
const { createClient } = require('redis')

const REDIS_SERVER = "redis://:hlxredis@10.100.0.127:6379"
const WEB_SOCKET_PORT = 3000

const client = createClient({ url: REDIS_SERVER });
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT })

client.on('error', (err) => console.log('Redis Client Error', err))
client.connect()


server.on('connection', function connection(ws) {
    console.log('WebSocket connected!')
    const getSmt = async () => {
        data = await client.LRANGE('track:10013HE3070840430543028229', 0, 200)
        ws.send(JSON.stringify(data))
        return data
    }
    getSmt()
})