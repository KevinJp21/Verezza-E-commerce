import { useState } from 'react';
import './ProductCarousel.css';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';

interface ProductCarouselProps {
  images: Array<{ src: string; altText: string }>;
  productId: string;
  productName: String;
}

export default function ProductCarousel({ images, productId, productName}: ProductCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="ProductCarousel">
      <button onClick={prevImage} className="carrouselButton CarrouselButtonLeft"  aria-label="Botón Prev">{arrowLeftIcon()}</button>
      {images.map((image, index) => (
        <div key={`${productId}-${index}`}>
          <img
          src={image.src}
          alt={image.altText || (productName as string) || ''}
          draggable="false"
          className={`ProductImage ${index === currentImageIndex ? 'visible' : ''}`}
          decoding='async'
        />
        </div>
      ))}
      <button onClick={nextImage} className="carrouselButton CarrouselButtonRight" aria-label="Botón Next">{arrowRightIcon()}</button>
    </div>
  );
}
