import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortingType } from '../../const';
import { ActionCreator } from '../../store/action';

function OffersSorting(props) {
  const {activeSorting, onSortingClick} = props;
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
            onClick={() => onSortingClick(sortingName)}
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
  onSortingClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeSorting: state.activeSorting,
});

const mapDispatchToProps = (dispatch) => ({
  onSortingClick(newSorting) {
    dispatch(ActionCreator.changeSorting(newSorting));
  },
});

export { OffersSorting };
export default connect(mapStateToProps, mapDispatchToProps)(OffersSorting);
