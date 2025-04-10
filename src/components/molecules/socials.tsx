import { FC } from 'react';
import styled from 'styled-components';
import { usePlacesStore } from '../../stores/placesStore';

const SocialsContainer = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.highlight || 'blue'};
  font-size: 0.8rem;
  text-align: left;
  margin-right: 10px;
`;

const getLinkAddress = (type: string, value: string) => {
  if (type === 'facebook_id') return `https://facebook.com/${value}`;
  if (type === 'twitter') return `https://twitter.com/${value}`;
  if (type === 'instagram') return `https://instagram.com/${value}`;
};

const getSocialName = (type: string) => {
  if (type === 'facebook_id') return `Facebook`;
  if (type === 'twitter') return `Twitter`;
  if (type === 'instagram') return `Instagram`;
};

const Socials: FC = () => {
  const { selectedRestaurant } = usePlacesStore();

  if (!selectedRestaurant) return null;

  const { social_media } = selectedRestaurant;

  const socials = Object.entries(social_media).map(([key, value]) => ({
    type: key,
    value: value,
  }));

  return (
    <SocialsContainer>
      {socials.map(({ type, value }) => {
        return (
          <Link href={getLinkAddress(type, value)} key={value}>
            {getSocialName(type)}
          </Link>
        );
      })}
    </SocialsContainer>
  );
};

export default Socials;
