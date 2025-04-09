import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StarRating from './starRating';

describe('StarRating', () => {
  it('renders 5 full stars for a rating of 10', () => {
    render(<StarRating rating={10} />);
    const fullStars = screen.getAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');
    const emptyStars = screen.queryAllByTestId('empty-star');
    expect(fullStars).toHaveLength(5);
    expect(halfStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(0);
  });

  it('renders 5 empty stars for a rating of 0', () => {
    render(<StarRating rating={0} />);
    const fullStars = screen.queryAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(fullStars).toHaveLength(0);
    expect(halfStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(5);
  });

  it('renders correct stars for a rating of 2', () => {
    render(<StarRating rating={2} />);
    // rating=2 rounds to 2, stars = (2/10)*5 = 1.0 → 1 full, 0 half, 4 empty
    const fullStars = screen.getAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(fullStars).toHaveLength(1);
    expect(halfStars).toHaveLength(0);
    expect(emptyStars).toHaveLength(4);
  });

  it('renders correct stars for a rating of 3', () => {
    render(<StarRating rating={3} />);
    // rating=3 rounds to 3, stars = (3/10)*5 = 1.5 → 1 full, 1 half, 3 empty
    const fullStars = screen.getAllByTestId('full-star');
    const halfStars = screen.getAllByTestId('half-star');
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(fullStars).toHaveLength(1);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(3);
  });

  it('renders correct stars for a rating of 9', () => {
    render(<StarRating rating={9} />);
    // rating=9 rounds to 9, stars = (9/10)*5 = 4.5 → 4 full, 1 half, 0 empty
    const fullStars = screen.getAllByTestId('full-star');
    const halfStars = screen.getAllByTestId('half-star');
    const emptyStars = screen.queryAllByTestId('empty-star');
    expect(fullStars).toHaveLength(4);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(0);
  });
});
