import { useState, useEffect, useRef } from 'react';
import './LatestProducts.css';
import p1 from '~/assets/images/StartSectionHome/banner01.webp'
import p2 from '~/assets/images/StartSectionHome/banner02.webp'
import p3 from '~/assets/images/StartSectionHome/banner03.webp'
import p4 from '~/assets/images/StartSectionHome/banner04.webp'
import p5 from '~/assets/images/StartSectionHome/tendencias.webp'
import p6 from '~/assets/images/StartSectionHome/banner01.webp'
const products = [
  { id: 1, nombre: 'Blazer', imagen: p1 },
  { id: 2, nombre: 'Vomero', imagen: p2 },
  { id: 3, nombre: 'Air Max', imagen: p3 },
  { id: 4, nombre: 'Air Jordan 1', imagen: p4 },
  { id: 5, nombre: 'Dunk', imagen: p5 },
  { id: 6, nombre: 'Dunk', imagen: p6 },
  { id: 7, nombre: 'Vomero', imagen: p2 },
  { id: 8, nombre: 'Air Max', imagen: p3 },
  { id: 9, nombre: 'Air Jordan 1', imagen: p4 },
  { id: 10, nombre: 'Dunk', imagen: p5 },
  { id: 11, nombre: 'Dunk', imagen: p6 },
];

export default function LatestProducts() {
  const [InitialIndex, setInitialIndex] = useState(0);
  const carrouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const ExtendedProducts = [...products.slice(-5), ...products, ...products.slice(0, 5)];

  const next = () => {
    setInitialIndex((prevIndice) => {
      const nextIndex = prevIndice + 1;
      if (nextIndex >= products.length) {
        setTimeout(() => setInitialIndex(0), 300);
        return products.length;
      }
      return nextIndex;
    });
  };

  const prev = () => {
    setInitialIndex((prevIndice) => {
      const nextIndex = prevIndice - 1;
      if (nextIndex < 0) {
        setTimeout(() => setInitialIndex(products.length - 1), 300);
        return -1;
      }
      return nextIndex;
    });
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - carrouselRef.current!.offsetLeft);
    setStartScrollLeft(InitialIndex);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carrouselRef.current!.offsetLeft;
    const walk = (x - startX) / carrouselRef.current!.offsetWidth;
    let newIndex = Math.round(startScrollLeft - walk * 5);
    
    if (newIndex < 0) {
      newIndex = products.length - 1;
    } else if (newIndex >= products.length) {
      newIndex = 0;
    }
    
    setInitialIndex(newIndex);
  };

  useEffect(() => {
    if (carrouselRef.current) {
      carrouselRef.current.style.transition = 'transform 0.3s ease';
      carrouselRef.current.style.transform = `translateX(-${(InitialIndex + 5) * 20}%)`;
    }
  }, [InitialIndex]);

  useEffect(() => {
    if (carrouselRef.current) {
      if (InitialIndex === products.length || InitialIndex === -1) {
        setTimeout(() => {
          if (carrouselRef.current) {
            carrouselRef.current.style.transition = 'none';
            carrouselRef.current.style.transform = `translateX(-${(InitialIndex === -1 ? products.length - 1 : 0) * 20}%)`;
          }
        }, 300);
      }
    }
  }, [InitialIndex, products.length]);

  useEffect(() => {
    const intervalo = setInterval(next, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="CarrouselContainer">
      <button onClick={prev} className="carrouselButton CarrouselButtonLeft">{'<'}</button>
      <div 
        className="carrusel-viewport"
        onMouseDown={startDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onMouseMove={onDrag}
      >
        <div 
          className="CarrouselProducts"
          ref={carrouselRef}
        >
          {ExtendedProducts.map((producto, index) => (
            <div key={`${producto.id}-${index}`} className="ProductItem">
              <img src={producto.imagen} alt={producto.nombre} draggable="false" />
              <p>{producto.nombre}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={next} className="carrouselButton CarrouselButtonRight">{'>'}</button>
    </section>
  );
}