import URL_CONFIGS from "@/lib/constants/urlconfigs"
import { loginOut } from '@/lib/tools/users'

export function UIFetch({ url: key, params, mapToFE = _ => _ } = {}) {
    const accessToken = localStorage.getItem('accessToken') || process.env.HLX_ACCESS_TOKEN
    let { url, method } = URL_CONFIGS[key] || {}

    const options = {
        method,
        headers: key === 'USER_LOGIN' ? {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Basic Y2xpZW50OnNlY3JldA=='
        } : {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + accessToken
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
            // loginOut()
        }
        return res.json()
    }).then(res => {
        if (key === 'USER_LOGIN') return res
        return (res && res.code === 0) ? mapToFE(res.data) : res
    })
}
