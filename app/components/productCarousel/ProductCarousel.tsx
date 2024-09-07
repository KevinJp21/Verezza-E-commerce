import { useState } from 'react';
import './ProductCarousel.css';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';

interface ProductCarouselProps {
  images: Array<{ src: string; altText: string }>;
  productId: string;
}

export default function ProductCarousel({ images, productId }: ProductCarouselProps) {
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
      {images.map((image, index) => (
        <a href={`/product/${productId}`} key={`${productId}-${index}`}>
          <img
          src={image.src}
          alt={image.altText}
          draggable="false"
          className={`ProductImage ${index === currentImageIndex ? 'visible' : ''}`}
          decoding='async'
        />
        </a>
      ))}
      <button onClick={nextImage} className="carrouselButton CarrouselButtonRight">{arrowRightIcon()}</button>
    </div>
  );
}
