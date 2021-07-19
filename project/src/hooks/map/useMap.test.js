import {renderHook, act} from '@testing-library/react-hooks';
import useMap from './useMap';
import React from 'react';

let city = null;
let testRef = null;
describe('Hook: useMap', () => {
  beforeAll(() => {
    city =  {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    };

    testRef = document;
  });
  it('should return Object', () => {
    const {result} = renderHook(() =>
      useMap(testRef, city));

    expect(result).toBeInstanceOf(Object);
    expect(Object.keys(result.current)).toHaveLength(2);

    // expect(result.instance).toEqual(city.location.latitude);
  });
});
// похоже нужно использовать jsdom для создания виртуального элемента для карты
