import { useState } from 'react';
import './ProductCarousel.css';
import { arrowLeftIcon, arrowRightIcon } from '~/assets/icons/icons';

interface ProductCarouselProps {
  productImages: Array<{ src: string; altText: string }>;
  productId: number | null;
  productName: string;
}

export default function ProductCarousel({ productImages, productId, productName}: ProductCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="ProductCarousel">
      <button onClick={prevImage} className="carrouselButton CarrouselButtonLeft"  aria-label="Botón Prev">{arrowLeftIcon()}</button>
      {productImages.map((image, index) => (
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
