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
    sessionStorage.removeItem('isAuthenticated')
    window.location.reload()
}
