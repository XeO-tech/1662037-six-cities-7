import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from './map';
import { testOffers } from './map.test-mocks';


describe('Component: Map', () => {
  render(<Map offers={testOffers} activeCardId={null} currentCard={null}/>);

  it('should render leaflet map', () => {
    expect(document.querySelector('.leaflet-container')).toBeInTheDocument();
  });
});
