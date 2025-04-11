import { FC } from 'react';
import styled from 'styled-components';

interface TagProps {
  label: string;
}

const TagWrapper = styled.span<{ color: string }>`
  border: solid 1px ${({ theme }) => theme.highlight || '#ffffff'};
  border-radius: 3px;
  color: black;
  display: inline-flex;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 3px;
  white-space: nowrap;
  width: fit-content;
`;

const Tag: FC<TagProps> = ({ label }) => (
  <TagWrapper color="#ffffff">{label}</TagWrapper>
);

export default Tag;
