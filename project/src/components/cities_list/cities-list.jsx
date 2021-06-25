import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';

function CitiesList(props) {
  const {cities, activeCity, onCityClick} = props;

  const cityClickHandler = (e, cityName) => {
    e.preventDefault();
    onCityClick(cityName);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((cityName) => (
          <li key={cityName} className="locations__item">
            <a
              onClick={(e) => cityClickHandler(e, cityName)}
              className={`locations__item-link tabs__item ${cityName === activeCity ? 'tabs__item--active' : ''}`}
              href="foo"
            >
              <span>{cityName}</span>
            </a>
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
    dispatch(ActionCreator.fillOffersList(newCity));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
