import React from 'react';
import { render } from '@testing-library/react';
import { testOffers } from './map.test-mocks';
import Map from './map';


describe('Component: Map', () => {
  render(<Map offers={testOffers} activeCardId={null} currentCard={null}/>);

  it('should render leaflet map', () => {
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });
});
