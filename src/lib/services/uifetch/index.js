import URL_CONFIGS from "@/lib/constants/urlconfigs"
import { loginOut } from '@/lib/tools/users'

export function UIFetch({ url: key, params, mapToFE = _ => _ } = {}) {
    let { url, method } = URL_CONFIGS[key] || {}
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + process.env.HLX_ACCESS_TOKEN
        }
    }

    if (method === 'POST') {
        options.body = JSON.stringify(params)
    }

    if (method === 'GET' && params) {
        url += '?' + new URLSearchParams(params)
    }

    return fetch(url, options).then(res => {
        if (res.status === 401) { // 用户未认证
            loginOut()
        }
        return res.json()
    }).then(res => {
        return (res && res.code === 0) ? mapToFE(res.data) : res
    })
}
