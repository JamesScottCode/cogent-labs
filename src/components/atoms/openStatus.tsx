import React from 'react';
import styled from 'styled-components';

const fallbackInfo = { color: '#BDBDBD', label: 'Unknown' };

type ClosedBucket = string;

interface ClockedBucketTextProps {
  color: string;
}

const ClockedBucketText = styled.span<ClockedBucketTextProps>`
  color: ${(props) => props.color || fallbackInfo.color};
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
`;

interface ClosedBucketInfo {
  color: string;
  label: string;
}

const closedBucketInfoMap: Record<ClosedBucket, ClosedBucketInfo> = {
  VeryLikelyOpen: { color: '#4CAF50', label: 'Likely Open!' },
  LikelyOpen: { color: '#81C784', label: 'Likely Open!' },
  Unsure: { color: '#FFB74D', label: '' },
  LikelyClosed: { color: '#EF9A9A', label: 'Likely Closed' },
  VeryLikelyClosed: { color: '#E53935', label: 'Likely Closed' },
};

export const getClosedBucketInfo = (
  closedBucket: ClosedBucket,
): ClosedBucketInfo => closedBucketInfoMap[closedBucket] || fallbackInfo;

interface OpenStatusProps {
  closedBucket: ClosedBucket;
}

const OpenStatus: React.FC<OpenStatusProps> = ({ closedBucket }) => {
  const { color, label } = getClosedBucketInfo(closedBucket);
  return (
    <ClockedBucketText data-testid="open-status" color={color}>
      {label}
    </ClockedBucketText>
  );
};

export default OpenStatus;
