export const BASE_LAYER_OPTIONS = [
    { name: '海图', id: 'sea', image: 'map_sea' },
    { name: '地图', id: 'vector', image: 'map_vector' },
    { name: '卫星图', id: 'image', image: 'map_image' },
    { name: '海图地图', id: 'vectorSea', image: 'map_vectorsea' },
    { name: '海图卫星', id: 'imageSea', image: 'map_imagesea' }
]

export const BASE_THEME_OPTIONS = [
    { name: '白天', id: 'day', icon: '#iconbaitian' },
    { name: '黄昏', id: 'dusk', icon: '#iconhuanghun' },
    { name: '夜晚', id: 'night', icon: '#iconyewan' }
]

export const BASE_MODE_OPTIONS = [
    { name: '基础', id: 'b', icon: '#iconjichu' },
    { name: '标准', id: 's', icon: '#iconbiaozhun' },
    { name: '全部', id: 'a', icon: '#iconquanbu' }
]

export const BUSINESS_LAYERS_OPTIONS = [
    { name: '渔区', id: 'fishing_area'},
    { name: '渔港', id: 'fishing_port'},
    { name: '锚地', id: 'anchorage'}
]

export const SITE_LAYERS_OPTIONS = [
    { name: '雷达站点', id: 'radar_site'},
    { name: '光电站点', id: 'photoele_site'},
    { name: 'AIS 站点', id: 'ais_site'},
    { name: '海缆', id: 'cable_site'},
    { name: '渤海管缆', id: 'cable-bohai_site'},
    { name: '深圳海油管缆', id: 'cable-shenzhen_site'}
]

export const METEOROLOGY_LAYERS_OPTIONS = [
    { name: '风', id: 'wind'},
    { name: '浪', id: 'wave'},
    { name: '流', id: 'stream'},
    { name: '涌向', id: 'waterflow'},
    { name: '台风', id: 'typhoon'}
]

export const AREA_SWITCH_OPTIONS = [
    { name: '海南', id: 'hainan', center: [108.5819, 19.6711]},
    { name: '广西', id: 'gxi', center: [108.8167, 21.6168]},
    { name: '广东', id: 'gdong', center: [112.8167, 21.6168]},
    { name: '福建', id: 'fujian', center: [119.5334, 25.0334]},
    { name: '浙江', id: 'zhejiang', center: [118.5334, 27.0334]},
    { name: '山东', id: 'shandong', center: [120.5335, 36.3334]},
    { name: '环渤海', id: 'huanbohai', center: [120.5335, 39.3334]},
    { name: '湖南', id: 'hunan', center: [112.6103, 26.9131]},
]