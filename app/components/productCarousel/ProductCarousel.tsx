import { useState } from 'react';
import './ProductCarousel.css';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';

interface ProductCarouselProps {
  images: Array<{ src: string; altText: string }>;
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="ProductCarousel">
      <button onClick={prevImage} className="carrouselButton CarrouselButtonLeft">{arrowLeftIcon()}</button>
      <img
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].altText}
        draggable="false"
        className="ProductImage"
      />
      <button onClick={nextImage} className="carrouselButton CarrouselButtonRight">{arrowRightIcon()}</button>
    </div>
  );
}
