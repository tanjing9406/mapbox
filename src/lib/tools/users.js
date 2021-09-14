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
