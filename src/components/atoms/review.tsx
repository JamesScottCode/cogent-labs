import { FC } from 'react';
import styled from 'styled-components';

interface ReviewProps {
  date?: string;
  text: string;
}

const ReviewWrapper = styled.span`
  background: ${({ theme }) => theme.backgroundSecondary || '#ffffff'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  margin: 5px 0;
  padding: 15px;
  text-align: left;
`;

const Date = styled.span`
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Comment = styled.span`
  font-size: 16px;
`;

const Review: FC<ReviewProps> = ({ date, text }) => (
  <ReviewWrapper>
    {date && <Date>Date: {date}</Date>}
    <Comment>{text}</Comment>
  </ReviewWrapper>
);

export default Review;
