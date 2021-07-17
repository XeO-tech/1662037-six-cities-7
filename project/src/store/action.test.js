import { ActionType, changeCity } from './action';

describe('Actions', () => {
  it('action creator for changing city returns correct action', () => {
    const city = 'testCity';

    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };

    expect(changeCity(city)).toEqual(expectedAction);
  });
});
