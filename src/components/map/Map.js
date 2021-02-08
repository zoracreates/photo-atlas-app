import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import MapPopup from '../map/MapPopUp'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import ChangeMapView from './ChangeMapView';

/* fix marker icon not rendering */
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


function Map(props) {

    let { locations, lat, lon, zoom } = props;

    if (!locations) {
        locations = []
    }

    if (!lat || !lon) {
        lat = 34.36;
        lon = -20.58;
    }

    let center = [lat, lon]

    return (

        <MapContainer center={center} zoom={10} >
            <ChangeMapView center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {locations.map((location, id) => {
                const { thumbnail, title, destination } = location;

                let lat = destination.latitude;
                let lon = destination.longitude;

                return (
                    <Marker key={id} position={[lat, lon]}>
                        <MapPopup 
                            thumbnail={thumbnail}
                            title={title}
                             />
                    </Marker>
                )
            })

            }

        </MapContainer>

    )
}

Map.propTypes ={
    locations: PropTypes.arrayOf(PropTypes.object),
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom:PropTypes.number
}

export default Map;