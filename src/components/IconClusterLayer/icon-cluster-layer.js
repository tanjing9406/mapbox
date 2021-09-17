import { CompositeLayer } from '@deck.gl/core'
import { IconLayer, LineLayer } from '@deck.gl/layers'
import Supercluster from 'supercluster'
import { ICOM_MAPPING_CONFIG as targetIconMapping } from '../TargetLayer/consts'
import { getLonAndLats } from '@/lib/maptools'

const toTargetIconMapping = {}

for (let i = 0; i <= 19; i++) {
  const name = `marker-${i}`
  toTargetIconMapping[name] = {
    url: `/src/assets/images/clusters/marker-${i}.png`,
    width: 128,
    height: 128,
    anchorY: 128
  }
}
const ICOM_MAPPING_CONFIG = Object.assign({}, targetIconMapping, toTargetIconMapping)

function getIconName(size, type) {
  let name
  if (size === 1) {
    name = type;
  } else if (size < 10) {
    name = `marker-${size - 1}`
  } else if (size < 100) {
    name = `marker-${Math.floor(size / 10) + 8}`
  } else {
    name = 'marker-18'
  }
  return ICOM_MAPPING_CONFIG[name] || ICOM_MAPPING_CONFIG['RADAR']
}

function getIconSize(size, type) {
  if (size == 1) {
    const { width, height } = ICOM_MAPPING_CONFIG[type] || ICOM_MAPPING_CONFIG['RADAR']
    return Math.max(width, height) / 160
  }
  return Math.min(100, size) / 100 + 1;
}

export default class IconClusterLayer extends CompositeLayer {
  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  updateState({ props, oldProps, changeFlags }) {
    const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

    if (rebuildIndex) {
      const index = new Supercluster({ minPoints: 20, maxZoom: 16, radius: props.sizeScale * Math.sqrt(2) });
      index.load(
        props.data.map(d => ({
          geometry: { coordinates: props.getPosition(d) },
          properties: d
        }))
      );
      this.setState({ index });
    }

    const z = Math.floor(this.context.viewport.zoom);
    if (rebuildIndex || z !== this.state.z) {
      this.setState({
        data: this.state.index.getClusters([-180, -85, 180, 85], z),
        z
      });
    }
  }

  getPickingInfo({ info, mode }) {
    const pickedObject = info.object && info.object.properties;
    if (pickedObject) {
      if (pickedObject.cluster && mode !== 'hover') {
        info.objects = this.state.index
          .getLeaves(pickedObject.cluster_id, 25)
          .map(f => f.properties);
      }
      info.object = pickedObject;
    }
    return info;
  }

  renderLayers() {
    const { data } = this.state;
    const { sizeScale } = this.props;

    return [new IconLayer(
      this.getSubLayerProps({
        id: 'icon',
        data,
        sizeScale,
        getPosition: d => d.geometry.coordinates,
        getIcon: d => getIconName(d.properties.cluster ? d.properties.point_count : 1, d.properties.type),
        getSize: d => getIconSize(d.properties.cluster ? d.properties.point_count : 1, d.properties.type),
        getAngle: d => -d.properties.heading,
        getColor: d => d.properties.cluster ? [0, 0, 0, 255] : [0, 255, 0, 255 * (d.properties.state === 1 ? 1 : 0.75)]
      })
    ), new LineLayer(this.getSubLayerProps({
      id: "target-layer-course-1",
      data: data.filter(d => !d.properties.cluster),
      pickable: false,
      getWidth: 2,
      getSourcePosition: d => d.geometry.coordinates,
      getTargetPosition: d => {
        const time = 6 // 矢量线时间单位为分钟
        const distance = d.properties.speed * 1.852 * 1000 * time / 60 // 1海里 = 1.852公里(千米) (中国标准)
        return getLonAndLats(d.properties.longitude, d.properties.latitude, d.properties.course, distance)
      },
      getColor: [54, 154, 204]
    }))
    ]
  }
}
