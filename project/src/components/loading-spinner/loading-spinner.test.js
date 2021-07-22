import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './loading-spinner';

describe('Component: LoadingSpinner', () => {
  render(<LoadingSpinner />);

  it('should render mock review', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
