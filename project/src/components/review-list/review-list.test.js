import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';

const testReviews = [
  {
    'comment': 'A quiet cozy',
    'date': '2019-05-08T14:13:56.569Z',
    'id': 1,
    'rating': 4,
    'user': {
      'avatarUrl': 'img/1.png',
      'id': 4,
      'isPro': false,
      'name': 'Max',
    },
  },
  {
    'comment': 'Nice place',
    'date': '2019-05-08T14:13:56.569Z',
    'id': 2,
    'rating': 3,
    'user': {
      'avatarUrl': 'img/1.png',
      'id': 4,
      'isPro': false,
      'name': 'Max',
    },
  },
];

describe('Component: Favorites', () => {
  beforeEach(() => {
    render(<ReviewList reviews={testReviews}/>);
  });

  it('should render both reviews from mocks', () => {
    expect(screen.getByText('A quiet cozy')).toBeInTheDocument();
    expect(screen.getByText('Nice place')).toBeInTheDocument();
  });

  it('should render "Reviews · 2"', () => {
    expect(document.querySelector('.reviews__amount').textContent).toEqual('2');
  });
});
