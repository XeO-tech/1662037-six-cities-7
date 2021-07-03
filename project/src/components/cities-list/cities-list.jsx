import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';

function CitiesList(props) {
  const {cities, activeCity, onCityClick} = props;

  const cityClickHandler = (cityName) => {
    onCityClick(cityName);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((cityName) => (
          <li key={cityName} className="locations__item">
            <div style={{cursor: 'pointer'}}
              onClick={(e) => cityClickHandler(cityName)}
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

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(newCity) {
    dispatch(ActionCreator.changeCity(newCity));
  },
});

export { CitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
