import { FC } from 'react';
import styled from 'styled-components';
import Review from '../atoms/review';
import { usePlacesStore } from '../../stores/placesStore';

const ReviewsContainer = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Reviews: FC = () => {
  const { selectedRestaurant } = usePlacesStore();

  if (!selectedRestaurant) return null;

  const { tips } = selectedRestaurant;

  const displayableReviews = tips.map((tip: any) => {
    const { created_at, text } = tip;
    const convertedDate = new Date(created_at);
    return {
      displayableDate: convertedDate.toLocaleString(),
      text,
    };
  });
  return (
    <ReviewsContainer>
      {displayableReviews.map(
        (date: { displayableDate: string; text: string }) => {
          if (!date?.text) return <></>;
          return (
            <Review
              date={date.displayableDate}
              text={date.text}
              key={`${date.displayableDate}-${date.text.slice(0, 10)}`}
            />
          );
        },
      )}
    </ReviewsContainer>
  );
};

export default Reviews;
