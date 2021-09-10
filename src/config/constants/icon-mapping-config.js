const baseUrl_targets = '/src/assets/images/targets/'
const baseUrl_icons = '/src/assets/images/icons/'

export const ICON_MAPPING_CONFIG = {
    'RADAR': { url: baseUrl_targets + 'radar.png', width: 60, height: 60 }, // TODO use spirite image
    'AIS_A': { url: baseUrl_targets + 'aisA_1.png', width: 80, height: 100 },
    'RADAR_AIS_A': { url: baseUrl_targets + 'aisAR_1.png', width: 80, height: 100 },
    'AIS_B': { url: baseUrl_targets + 'aisB_1.png', width: 60, height: 100 },
    'RADAR_AIS_B': { url: baseUrl_targets + 'aisBR_1.png', width: 60, height: 100 },
    'RADAR_AIS_B': { url: baseUrl_targets + 'aisBR_1.png', width: 60, height: 100 },
    'AID': { url: baseUrl_targets + 'AID.png', width: 100, height: 100 },
    'RADAR_VAID': { url: baseUrl_targets + 'VAIDR.png', width: 100, height: 100 },
    'RADAR_AID': { url: baseUrl_targets + 'AIDR.png', width: 100, height: 100 },
    'VAID': { url: baseUrl_targets + 'VAID.png', width: 100, height: 100 }, // UNKNOWN BDS bds_fuse

    'target_selected': { url: `${baseUrl_icons}tarselect.png`, width: 120, height: 120 },
    'ais_site': { url: `${baseUrl_icons}aiszhan.png`, width: 30, height: 35 },
    'radar_site': { url: `${baseUrl_icons}radarzhan.png`, width: 30, height: 35 },
    'photoele_site': { url: `${baseUrl_icons}photoelectric.png`, width: 30, height: 35 },
}