import { useEffect} from 'react';

import * as ReactLeaflet from 'react-leaflet'
 const { MapConsumer, MapContainer } = ReactLeaflet;
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import iconMarkerx2 from 'leaflet/dist/images/marker-icon-2x.png'
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconMarkerShadow from 'leaflet/dist/images/marker-shadow.png'

const Map =({children, className, ...rest})=>{
  const position = [51.505, -0.09]

  let mapClassName = styles.map;
  if(className){
    mapClassName = `${mapClassName} ${className}`
  }

  useEffect(()=>{
// FIX leaflet's default icon path problems with webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconMarkerx2.src,
  iconUrl: iconMarker.src,
  shadowUrl: iconMarkerShadow.src
})

  },[])
  return (
    <MapContainer className={mapClassName} {...rest} >
    <MapConsumer>
        {(map) => children(ReactLeaflet, map)}
      </MapConsumer>
  </MapContainer>
  )
};

export default Map;