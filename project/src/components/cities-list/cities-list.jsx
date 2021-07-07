import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/action';
import { getCity } from '../../store/app-data/selectors';
import { cities } from '../../const';

function CitiesList() {

  const activeCity = useSelector(getCity);

  const dispatch = useDispatch();

  const onCityClick = (cityName) => dispatch(changeCity(cityName));

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((cityName) => (
          <li key={cityName} className="locations__item">
            <div style={{cursor: 'pointer'}}
              onClick={(e) => onCityClick(cityName)}
              className={`locations__item-link tabs__item ${cityName === activeCity ? 'tabs__item--active' : ''}`}
            >
              <span>{cityName}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
