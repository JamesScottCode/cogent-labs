import React, { FC } from 'react';
import styled from 'styled-components';
import { usePlacesStore } from '../../stores/placesStore';

const SortContainer = styled.div`
  align-items: center;
  display: flex;
  background-color: ${({ theme }) => theme.background || '#fff'};
  border: 1px solid ${({ theme }) => theme.highlight || '#ccc'};
  border-radius: 8px;
  padding: 0.5rem;
  width: auto;
`;

const StyledSortSelect = styled.select`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.font || '#000'};
  font-size: 1rem;
  outline: none;
`;

const SortOptions: FC = () => {
  const { currentSearch, fetchPlaces, setCurrentSearch } = usePlacesStore();
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'distance', label: 'Closest' },
    { value: 'rating', label: 'Rating' },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setCurrentSearch({ sort: newSort });
    fetchPlaces();
  };

  return (
    <SortContainer>
      <StyledSortSelect
        onChange={handleSortChange}
        defaultValue={currentSearch?.sort || 'relevance'}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSortSelect>
    </SortContainer>
  );
};

export default SortOptions;
