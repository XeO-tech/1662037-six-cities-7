import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { cardProp } from '../card/card.prop';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/map/useMap';

function Map(props) {
  const {offers, activeCardId} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);

  const icon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [20, 30],
    iconAnchor: [10, 30],
  });

  const activeIcon = leaflet.icon({
    iconUrl: 'img/pin-active.svg',
    iconSize: [20, 30],
    iconAnchor: [10, 30],
  });

  useEffect(() => {
    if (map.instance) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeCardId) ? activeIcon : icon,
          })
          .addTo(map.markerLayer);
      });
    }
  }, [map, offers, icon, activeIcon, activeCardId]);

  return (
    <div style={{height: '100%'}} ref={mapRef} />
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(cardProp.offer),
  activeCardId: PropTypes.number,
};

export default Map;
