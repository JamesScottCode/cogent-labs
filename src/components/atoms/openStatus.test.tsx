import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import OpenStatus, { getClosedBucketInfo } from './openStatus';

describe('getClosedBucketInfo', () => {
  it('returns info for VeryLikelyOpen', () => {
    expect(getClosedBucketInfo('VeryLikelyOpen')).toEqual({
      color: '#4CAF50',
      label: 'Likely Open!',
    });
  });
  it('returns info for LikelyOpen', () => {
    expect(getClosedBucketInfo('LikelyOpen')).toEqual({
      color: '#81C784',
      label: 'Likely Open!',
    });
  });
  it('returns info for Unsure', () => {
    expect(getClosedBucketInfo('Unsure')).toEqual({
      color: '#FFB74D',
      label: '',
    });
  });
  it('returns info for LikelyClosed', () => {
    expect(getClosedBucketInfo('LikelyClosed')).toEqual({
      color: '#EF9A9A',
      label: 'Likely Closed',
    });
  });
  it('returns info for VeryLikelyClosed', () => {
    expect(getClosedBucketInfo('VeryLikelyClosed')).toEqual({
      color: '#E53935',
      label: 'Likely Closed',
    });
  });
});

describe('OpenStatus', () => {
  it('renders Likely Open! with correct color for VeryLikelyOpen', () => {
    render(<OpenStatus closedBucket="VeryLikelyOpen" />);
    const span = screen.getByTestId('open-status');
    expect(span).toHaveTextContent('Likely Open!');
    expect(span).toHaveStyle('color: #4CAF50');
  });
  it('renders Likely Open! with correct color for LikelyOpen', () => {
    render(<OpenStatus closedBucket="LikelyOpen" />);
    const span = screen.getByTestId('open-status');
    expect(span).toHaveTextContent('Likely Open!');
    expect(span).toHaveStyle('color: #81C784');
  });
  it('renders empty label with correct color for Unsure', () => {
    render(<OpenStatus closedBucket="Unsure" />);
    const span = screen.getByTestId('open-status');
    expect(span).toHaveTextContent('');
    expect(span).toHaveStyle('color: #FFB74D');
  });
  it('renders Likely Closed with correct color for LikelyClosed', () => {
    render(<OpenStatus closedBucket="LikelyClosed" />);
    const span = screen.getByTestId('open-status');
    expect(span).toHaveTextContent('Likely Closed');
    expect(span).toHaveStyle('color: #EF9A9A');
  });
  it('renders Likely Closed with correct color for VeryLikelyClosed', () => {
    render(<OpenStatus closedBucket="VeryLikelyClosed" />);
    const span = screen.getByTestId('open-status');
    expect(span).toHaveTextContent('Likely Closed');
    expect(span).toHaveStyle('color: #E53935');
  });
});
