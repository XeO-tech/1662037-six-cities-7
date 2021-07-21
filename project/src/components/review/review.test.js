import React from 'react';
import { render, screen } from '@testing-library/react';
import Review from './review';

const testReview =
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
  };

describe('Component: Review', () => {
  render(<Review review={testReview}/>);

  it('should render mock review', () => {
    expect(screen.getByText('A quiet cozy')).toBeInTheDocument();
  });
});
