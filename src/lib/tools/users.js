export function hasEntitlement(menuItem) {
    const { entitlement } = menuItem
    const entitlements = localStorage.getItem('entitlements')

    if (entitlement) {
        if (entitlements && entitlements.includes(entitlement)) {
            return true
        }
        return false
    }

    return true
}

export function loginOut() {
    localStorage.removeItem('entitlements')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('isAuthenticated')
    window.location.reload()
}

export function loginSuccess(rst) {
    localStorage.setItem('accessToken', rst.access_token)
    localStorage.setItem('isAuthenticated', true)
}
