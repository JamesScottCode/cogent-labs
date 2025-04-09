import React from 'react';
import styled from 'styled-components';
import { usePlacesStore } from '../../stores/placesStore';
import { Category, Place } from '../../types/places';
import Hours from '../atoms/hours';
import Tag from '../atoms/tag';
import StarRating from '../atoms/starRating';
import OpenStatus from '../atoms/openStatus';

const OuterContainer = styled.div<{ $isToolTip?: boolean }>`
  box-sizing: border-box;
  height: 220px;
  position: relative;
  width: ${(props) => (props.$isToolTip ? '300px' : '100%')};
  z-index: ${(props) => (props.$isToolTip ? 8000 : 'auto')};
`;

const InnerContainer = styled.div<{
  $isHovered: boolean;
  $selectedRestaurant?: Place;
}>`
  box-sizing: border-box;
  border: ${({ $isHovered, theme }) =>
    $isHovered ? `1px solid ${theme.highlight || '#000000'}` : 'none'};
  border-radius: 10px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  padding: 20px;
  position: absolute;
  top: 0;
  transition:
    transform 0.2s ease,
    border 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;
  &:hover {
    border: 1px solid ${({ theme }) => theme.highlight || '#000000'};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    pointer-events: auto;
    transform: ${({ $isHovered }) =>
      $isHovered ? `scale(1.01)` : 'scale(1.03)'};
    z-index: 2;
  }
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.highlight || '#000000'};
  font-size: 0.8rem;
  font-weight: 600;
  text-align: left;
`;

const Address = styled.span`
  color: ${({ theme }) => theme.font || '#000000'};
  font-size: 0.6rem;
  font-weight: 600;
  text-align: left;
`;

const Photo = styled.img`
  border-radius: 10px;
  height: 100px;
  margin-top: 10px;
  object-fit: cover;
  width: 100px;
  z-index: 1;
`;

const DetailsRow = styled.div`
  display: flex;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  max-width: 100%;
  text-align: left;
`;

const DetailText = styled.span`
  font-size: 0.8rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 5px;
`;

const getPriceText = (price: number) => '\u00A5 '.repeat(Math.max(price, 0));

interface ResultListItemProps {
  data: Place;
  id: string;
  isTooltip?: boolean;
}

const ResultListItem: React.FC<ResultListItemProps> = ({
  data,
  isTooltip,
  id,
}) => {
  const { hoveredRestaurantId, setHoveredRestaurantId } = usePlacesStore();
  const {
    categories = [],
    distance,
    fsq_id,
    location,
    name,
    rating,
    price,
    hours,
    closed_bucket,
    photos,
  } = data;

  const { address } = location;
  const photo = photos[0];

  return (
    <OuterContainer
      data-testid="result-list-item"
      $isToolTip={Boolean(isTooltip)}
      onMouseEnter={() => setHoveredRestaurantId(fsq_id)}
      onMouseLeave={() => setHoveredRestaurantId('')}
      id={id}
    >
      <InnerContainer $isHovered={hoveredRestaurantId === fsq_id}>
        <TitleRow>
          <Title>{name ?? 'unnamed'}</Title>
          <OpenStatus closedBucket={closed_bucket} />
        </TitleRow>
        <TitleRow>
          {address && <Address>{address}</Address>}
          {rating && <StarRating rating={rating} />}
        </TitleRow>
        <DetailsRow>
          {photo && (
            <Photo
              key={photo?.prefix ?? ''}
              src={
                photo
                  ? `${photo.prefix}100x100${photo.suffix}`
                  : 'no_img_available.png'
              }
            />
          )}
          <Details>
            {distance && <DetailText>{distance}m</DetailText>}
            {price && <DetailText>{getPriceText(price)}</DetailText>}
            <TagRow>
              {!isTooltip &&
                categories?.length &&
                categories.map((category: Category, index: number) => (
                  <Tag
                    key={`${category?.id}-${index}`}
                    label={category?.short_name}
                  />
                ))}
            </TagRow>
            {hours && <Hours hours={hours} />}
          </Details>
        </DetailsRow>
      </InnerContainer>
    </OuterContainer>
  );
};

export default ResultListItem;
