import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingType } from '../../const';
import OffersSorting from './offers-sorting';

let onSortingChange = null;

describe('Component: OffersSorting', () => {

  beforeEach(() => {
    onSortingChange = jest.fn();

    render(<OffersSorting activeSorting={SortingType.POPULAR} onSortingChange={onSortingChange}/>);
  });

  it('should render active sorting type with active class', () => {
    expect(document.querySelector('.places__sorting-type')).toBeInTheDocument();
    expect(document.querySelector('.places__option--active')).toBeInTheDocument();
  });

  it('should fire onSortingChange callback when click on sorting type', () => {
    userEvent.click(document.querySelector('.places__option'));
    expect(onSortingChange).toBeCalled();
  });
});
