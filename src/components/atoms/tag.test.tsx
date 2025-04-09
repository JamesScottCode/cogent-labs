import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Tag from './tag';

describe('Tag', () => {
  it('renders the label', () => {
    render(<Tag label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
});
