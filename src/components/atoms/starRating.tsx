import React from 'react';
import styled from 'styled-components';

interface StarRatingProps {
  rating: number;
}

const Star = styled.span`
  font-size: 0.75rem;
  margin-right: 2px;
`;

const FullStar = styled(Star)`
  color: ${({ theme }) => theme.highlight || 'gold'};
`;

const EmptyStar = styled(Star)`
  color: ${({ theme }) => theme.highlight || '#ccc'};
`;

const HalfStar = styled(Star)`
  position: relative;
  display: inline-block;
  /* Set the base star color to the empty star color */
  color: ${({ theme }) => theme.highlight || '#ccc'};

  /* The pseudo-element overlays half of the star in the highlight color */
  &::before {
    content: '★';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    overflow: hidden;
    color: ${({ theme }) => theme.highlight || '#ccc'};
  }
`;

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const roundedRating = Math.ceil(rating);
  const totalStars = 5;
  const stars = (roundedRating / 10) * totalStars;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars - fullStars === 0.5;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      {Array.from({ length: fullStars }, (_, i) => (
        <FullStar key={`full-${i}`} data-testid="full-star">
          ★
        </FullStar>
      ))}
      {hasHalfStar && (
        <HalfStar key="half" data-testid="half-star">
          ☆
        </HalfStar>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <EmptyStar key={`empty-${i}`} data-testid="empty-star">
          ☆
        </EmptyStar>
      ))}
    </div>
  );
};

export default StarRating;
