import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  font-size: 0.75em;
  font-style: italic;
`;

export interface HoursData {
  display?: string;
  is_local_holiday?: boolean;
}

export interface HoursProps {
  hours?: HoursData;
}

export const DAY_REGEX = /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/g;

export const formatDisplayableHours = (display?: string): string[] => {
  if (!display) return [''];
  return display.split(';').map((line) => line.trim());
};

export const highlightDays = (text: string): React.ReactNode[] => {
  const parts = text.split(DAY_REGEX);
  return parts.map((part, index) =>
    DAY_REGEX.test(part) ? <strong key={index}>{part}</strong> : part,
  );
};

const Hours: React.FC<HoursProps> = ({ hours }) => {
  if (hours?.is_local_holiday) {
    return (
      <Text data-testid="holiday-message">*Holiday hours might differ</Text>
    );
  }

  const lines = formatDisplayableHours(hours?.display);
  return (
    <Container>
      {lines.map((line, idx) => (
        <Text data-testid="hours-line" key={idx}>
          {highlightDays(line)}
        </Text>
      ))}
    </Container>
  );
};

export default Hours;
