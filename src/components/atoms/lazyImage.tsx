import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from './spinner';

const Skeleton = styled.div`
  align-items: center;
  background-color: #eee;
  border-radius: 8px;
  display: flex;
  height: 375px;
  justify-content: center;
  max-width: 800px;
  min-height: 375px;
  width: 100%;
`;

const StyledImage = styled.img`
  border-radius: 8px;
  height: auto;
  max-width: 800px;
  width: 100%;
`;

const LazyImage: FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded && (
        <Skeleton>
          <Spinner />
        </Skeleton>
      )}
      <StyledImage
        src={src ?? null}
        alt={alt ?? ''}
        style={{ display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default LazyImage;
