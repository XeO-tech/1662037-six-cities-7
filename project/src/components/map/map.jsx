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

  const {offers} = props;

  const icon = leaflet.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: icon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, icon]);

  return (
    <div style={{height: '100%'}} ref={mapRef} />
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(cardProp),
};

export default Map;
