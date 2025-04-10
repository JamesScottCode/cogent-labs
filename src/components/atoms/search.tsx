import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background || '#fff'};
  border: 1px solid ${({ theme }) => theme.highlight || '#ccc'};
  border-radius: 8px;
  padding: 0.5rem;
  max-width: 400px;
  height: 20px;
`;

const Icon = styled.svg`
  width: 1rem;
  height: 1rem;
  stroke: ${({ theme }) => theme.highlight || '#000'};
  fill: none;
  stroke-width: 2;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.font || '#000'};
`;

interface SearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const DEBOUNCE_DELAY = 500;

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
}) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastSubmittedValue = useRef<string>(value);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value !== lastSubmittedValue.current) {
        onSubmit();
        lastSubmittedValue.current = value;
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [value, onSubmit]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      onSubmit();
      lastSubmittedValue.current = value;
    }
  };

  const handleIconClick = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    onSubmit();
    lastSubmittedValue.current = value;
  };

  return (
    <Container>
      <Icon
        onClick={handleIconClick}
        viewBox="0 0 24 24"
        data-testid="search-icon"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </Icon>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default Search;
