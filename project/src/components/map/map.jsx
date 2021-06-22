import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { cardProp } from '../card/card.prop';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';

const city = {
  title: 'Amsterdam',
  lat: 52.38333,
  lng: 4.9,
  zoom: 10,
};

function Map(props) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const {offers, activeCard} = props;

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
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeCard) ? activeIcon : icon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, icon, activeIcon, activeCard]);

  return (
    <div style={{height: '100%'}} ref={mapRef} />
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
  activeCard: PropTypes.number,
};

export default Map;
