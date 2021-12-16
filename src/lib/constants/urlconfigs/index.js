import ALARM_URL_CONFIG from './alarmconfig'
import BHOIL_URL_CONFIG from './bhoilconfig'
import SITE_URL_CONFIG from './siteconfig'
import TARGET_URL_CONFIG from './targetconfig'
import USERS_URL_CONFIG from './usersconfig'

export default {
    ...ALARM_URL_CONFIG,
    ...BHOIL_URL_CONFIG,
    ...SITE_URL_CONFIG,
    ...TARGET_URL_CONFIG,
    ...USERS_URL_CONFIG,
}