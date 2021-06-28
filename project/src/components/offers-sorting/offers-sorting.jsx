import React from 'react';
import PropTypes from 'prop-types';
import { SortingType } from '../../const';

function OffersSorting(props) {
  const {activeSorting, onSortingChange} = props;
  const sortingNames = Object.values(SortingType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
    Popular
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortingNames.map((sortingName) => (
          <li
            key={sortingName}
            onClick={() => onSortingChange(sortingName)}
            className={`places__option ${activeSorting === sortingName ? 'places__option--active' : ''}`}
            tabIndex={0}
          >
            {sortingName}
          </li>
        ))}
      </ul>
    </form>
  );
}

OffersSorting.propTypes = {
  activeSorting: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired,
};

export default OffersSorting;
