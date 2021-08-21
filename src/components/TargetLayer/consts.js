const baseUrl = '/src/assets/images/targets/'

export const ICOM_MAPPING_CONFIG = {
    'RADAR': { url: baseUrl + 'radar.png', width: 60, height: 60 }, // TODO use spirite image
    'AIS_A': { url: baseUrl + 'aisA_1.png', width: 80, height: 100 },
    'RADAR_AIS_A': { url: baseUrl + 'aisAR_1.png', width: 80, height: 100 },
    'AIS_B': { url: baseUrl + 'aisB_1.png', width: 60, height: 100 },
    'RADAR_AIS_B': { url: baseUrl + 'aisBR_1.png', width: 60, height: 100 },
    'RADAR_AIS_B': { url: baseUrl + 'aisBR_1.png', width: 60, height: 100 },
    'AID': { url: baseUrl + 'AID.png', width: 100, height: 100 },
    'RADAR_VAID': { url: baseUrl + 'VAIDR.png', width: 100, height: 100 },
    'RADAR_AID': { url: baseUrl + 'AIDR.png', width: 100, height: 100 },
    'VAID': { url: baseUrl + 'VAID.png', width: 100, height: 100 }, // UNKNOWN BDS bds_fuse

    'target_selected': { url: '/src/assets/images/icons/tarselect.png', width: 120, height: 120 }
}

export default {}
