import { renderHook } from '@testing-library/react-hooks';
import useMap from './useMap';

let city = null;
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
  });

  it('should return map instance with markerLayer the provided center point coordinates', () => {
    const element = document.createElement('div');

    const testRef = {
      current: element,
    };

    const {result} = renderHook(() =>
      useMap(testRef, city));

    expect(Object.keys(result.current)[0]).toEqual('instance');
    expect(Object.keys(result.current)[1]).toEqual('markerLayer');
  });

  it('map should be centered as in the provided center point coordinates', () => {
    const element = document.createElement('div');

    const testRef = {
      current: element,
    };

    const {result} = renderHook(() =>
      useMap(testRef, city));

    expect(result.current.instance.options.center.lat).toEqual(city.location.latitude);
  });
});

