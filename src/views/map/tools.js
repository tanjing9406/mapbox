import formatcoords from 'formatcoords'

export function getDmsArray(lat, lng) {
    // return [dmsLat, dmsLng]
    return formatcoords(lat, lng).format({ latLonSeparator: ',', decimalPlaces: 0 }).split(',')
}