import { UIFetch } from "../uifetch"

export function userLogin(params) {
    return UIFetch({ url: 'USER_LOGIN', params: params })
}

export default {
    userLogin
}
