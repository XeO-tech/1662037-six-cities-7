import {useEffect, useState} from 'react';
import leaflet from 'leaflet';

function useMap(mapRef, city) {
  const [map, setMap] = useState({instance: null, markerLayer: null});

  useEffect(() => {
    const markerLayer = leaflet.layerGroup();

    if (mapRef.current !== null && map.instance === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        layers: [markerLayer],
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap({instance, markerLayer});
    }

    if (map.instance !== null) {
      map.markerLayer.clearLayers();

      map.instance.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
