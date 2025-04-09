import { render, screen, within } from '@testing-library/react';
import Hours, { formatDisplayableHours, highlightDays } from './hours';

describe('formatDisplayableHours', () => {
  test("returns [''] when display is undefined", () => {
    expect(formatDisplayableHours(undefined)).toEqual(['']);
  });

  test('splits string by semicolon and trims each line', () => {
    const input =
      'Mon-Fri 12:00-15:00, 17:30-23:00; Sat 12:00-15:00, 17:00-23:00;Sun 12:00-15:00, 17:00-22:00';
    expect(formatDisplayableHours(input)).toEqual([
      'Mon-Fri 12:00-15:00, 17:30-23:00',
      'Sat 12:00-15:00, 17:00-23:00',
      'Sun 12:00-15:00, 17:00-22:00',
    ]);
  });
});

describe('highlightDays', () => {
  test('wraps day abbreviations in <strong> tags', () => {
    const input = 'Mon-Fri';
    render(<div data-testid="highlight-output">{highlightDays(input)}</div>);
    const container = screen.getByTestId('highlight-output');

    const strongMon = within(container).getByText('Mon');
    expect(strongMon.tagName).toBe('STRONG');

    const strongFri = within(container).getByText('Fri');
    expect(strongFri.tagName).toBe('STRONG');
  });

  test('returns the same text if no day abbreviations are found', () => {
    const input = 'Closed';
    expect(highlightDays(input)).toEqual(['Closed']);
  });
});

// COMPONENT RENDERING
describe('Hours Component', () => {
  test('renders holiday message when is_local_holiday is true', () => {
    render(<Hours hours={{ is_local_holiday: true }} />);
    const holidayMsg = screen.getByTestId('holiday-message');
    expect(holidayMsg).toHaveTextContent('*Holiday hours might differ');
  });

  test('renders empty text when display is undefined', () => {
    render(<Hours hours={{}} />);
    const lines = screen.getAllByTestId('hours-line');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toHaveTextContent('');
  });

  test('renders formatted hours with highlighted days', () => {
    const display =
      'Mon-Fri 12:00-15:00, 17:30-23:00; Sat 12:00-15:00, 17:00-23:00; Sun 12:00-15:00, 17:00-22:00';
    render(<Hours hours={{ display }} />);

    // Get all rendered hour lines using their test id.
    const hoursLines = screen.getAllByTestId('hours-line');
    expect(hoursLines).toHaveLength(3);

    // Verify that the first line contains highlighted "Mon" and "Fri"
    const lineOne = hoursLines[0];
    const strongMon = within(lineOne).getByText('Mon');
    expect(strongMon.tagName).toBe('STRONG');
    const strongFri = within(lineOne).getByText('Fri');
    expect(strongFri.tagName).toBe('STRONG');

    // Verify that the second line contains highlighted "Sat"
    const lineTwo = hoursLines[1];
    const strongSat = within(lineTwo).getByText('Sat');
    expect(strongSat.tagName).toBe('STRONG');

    // Verify that the third line contains highlighted "Sun"
    const lineThree = hoursLines[2];
    const strongSun = within(lineThree).getByText('Sun');
    expect(strongSun.tagName).toBe('STRONG');
  });
});
