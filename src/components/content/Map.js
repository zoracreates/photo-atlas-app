import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

/* fix marker icon not rendering */
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

/* 
Except for its children, MapContainer props are immutable, and changes must be passed as events in children
https://react-leaflet.js.org/docs/api-map/
https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes*/
function ChangeMapView(props) {
    let { center,zoom } = props;
    const map = useMap();
    map.setView(center, zoom);
    console.log('map center:', map.getCenter())
    return null
}

function Map(props) {

    let { locations, lat, lon, zoom } = props;

    if (!locations) {
        locations = []
    }

    if (!lat || !lon) {
        lat = 42.3601;
        lon = -71.0589;
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
                const { thumbnail, title, distance, saves, lat, lon } = location;
                return (
                    <Marker key={id} position={[lat, lon]}>
                        <Popup>
                            <img src={thumbnail} alt="" />
                            <p>{title}</p>
                            Distance: {distance}
                            Saves: {saves}
                        </Popup>
                    </Marker>

                )
            })

            }

        </MapContainer>

    )
}

export default Map;