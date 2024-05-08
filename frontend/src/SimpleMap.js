import React, { useRef } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
function SimpleMap({ geolocation_data }) {
    const mapRef = useRef(null);
    const defaultLatitude = 0; // Center latitude
    const defaultLongitude = 0; // Center longitude
    const minZoom = 1;
    const maxZoom = 5;

    return (
        
        <MapContainer
            center={[defaultLatitude, defaultLongitude]}
            zoom={1} // Initial zoom level
            minZoom={minZoom} // Minimum zoom level
            maxZoom={maxZoom} // Maximum zoom level
            ref={mapRef}
            style={{ height: '50vh', width: '70vw', gridColumn: 'span 2' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                geolocation_data.map((data, index) => (
                    <Marker key={index} position={[parseFloat(data.Latitude), parseFloat(data.Longitude)]}>
                        <Popup>
                            <div>
                                <p>Country: {data['Country Fullname']}</p>
                                <p>City: {data.City}</p>
                                <p>Latitude: {data.Latitude}</p>
                                <p>Longitude: {data.Longitude}</p>
                                <p>Region: {data.Region}</p>
                                <p>Timezone: {data.Timezone}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
}

export default SimpleMap;
