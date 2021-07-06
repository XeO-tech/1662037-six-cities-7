import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { SortingType } from '../../const';

function OffersSorting(props) {
  const {activeSorting, onSortingChange} = props;
  const sortingNames = Object.values(SortingType);

  const sortingList = useRef();

  const toggleSortingListVisibility = () => sortingList.current.classList.toggle('visually-hidden');

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={() => toggleSortingListVisibility()}
        className="places__sorting-type"
        tabIndex={0}
      >
        {activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul ref={sortingList} className="places__options places__options--custom places__options--opened visually-hidden">
        {sortingNames.map((sortingName) => (
          <li
            key={sortingName}
            onClick={() => {
              onSortingChange(sortingName);
              toggleSortingListVisibility();
            }}
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
