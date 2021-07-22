import React from 'react';
import { render } from '@testing-library/react';
import Map from './map';
import { testOffers } from './map.test-mocks';


describe('Component: Map', () => {
  render(<Map offers={testOffers} activeCardId={null} currentCard={null}/>);

  it('should render leaflet map', () => {
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });

  it('should render on map markers for each offer', () => {
    expect(document.querySelectorAll('.leaflet-marker-icon').length).toEqual(3);
  });
});

