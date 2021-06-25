import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function CitiesList(props) {
  const {cities, activeCity} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city} className="locations__item">
            <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="foo">
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const mapStateToProps = (state) => ({
  activeCity: state.city.name,
});

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
};

export {CitiesList};
export default connect(mapStateToProps, null)(CitiesList);
