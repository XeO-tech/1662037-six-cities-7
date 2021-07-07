import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { cardProp } from '../card/card.prop';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/map/useMap';

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

const MAP_HEIGHT = '100%';

function Map(props) {
  const {offers, activeCardId, currentCard} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCard ?? offers[0].city);

  useEffect(() => {
    if (map.instance) {
      let allOffers;
      currentCard ? allOffers = [...offers, currentCard] : allOffers = [...offers];

      allOffers.forEach((offer) => {
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
  }, [map, offers, activeCardId, currentCard]);

  return (
    <div style={{height: MAP_HEIGHT}} ref={mapRef} />
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(cardProp.offer).isRequired,
  activeCardId: PropTypes.number,
  currentCard: cardProp.offer,
};

export default Map;
