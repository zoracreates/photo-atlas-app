import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';
function ChangeMapView(props) {
    let { center, zoom } = props;
    const map = useMap();
    map.setView(center, zoom);
    return null
}

ChangeMapView.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom:PropTypes.number
}

export default ChangeMapView;
/* 
Except for its children, MapContainer props are immutable, and changes must be passed as events in children
https://react-leaflet.js.org/docs/api-map/
https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes*/