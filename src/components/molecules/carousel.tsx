import { FC, useState } from 'react';
import styled from 'styled-components';
import LazyImage from '../atoms/lazyImage';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
`;

const CarouselImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  border-radius: 50%;
`;

const PrevButton = styled(ArrowButton)`
  left: 10px;
`;

const NextButton = styled(ArrowButton)`
  right: 10px;
`;

interface CarouselProps {
  images: { src: string; alt?: string }[];
}

const Carousel: FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  if (!images) return <></>;

  return (
    <CarouselContainer>
      <PrevButton onClick={goToPrevious}>{'<'}</PrevButton>
      <NextButton onClick={goToNext}>{'>'}</NextButton>
      <CarouselImageWrapper key={images[currentIndex]?.src ?? ''}>
        <LazyImage
          src={images[currentIndex]?.src ?? ''}
          alt={images[currentIndex]?.alt ?? 'Carousel image'}
        />
      </CarouselImageWrapper>
    </CarouselContainer>
  );
};

export default Carousel;
