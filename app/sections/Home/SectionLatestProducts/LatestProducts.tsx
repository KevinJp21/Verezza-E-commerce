import { useState, useEffect, useRef } from 'react';
import './LatestProducts.css';
import p1 from '~/assets/images/StartSectionHome/banner01.webp'
import p2 from '~/assets/images/StartSectionHome/banner02.webp'
import p3 from '~/assets/images/StartSectionHome/banner03.webp'
import p4 from '~/assets/images/StartSectionHome/banner04.webp'
import p5 from '~/assets/images/StartSectionHome/tendencias.webp'
import p6 from '~/assets/images/StartSectionHome/banner01.webp'
const productos = [
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
  const [indiceInicial, setIndiceInicial] = useState(0);
  const carruselRef = useRef<HTMLDivElement>(null);

  const productosVisibles = productos.slice(indiceInicial, indiceInicial + 5);

  const avanzar = () => {
    setIndiceInicial((prevIndice) => 
      (prevIndice + 1) % (productos.length - 4)
    );
  };

  const retroceder = () => {
    setIndiceInicial((prevIndice) => 
      prevIndice === 0 ? productos.length - 5 : prevIndice - 1
    );
  };

  useEffect(() => {
    if (carruselRef.current) {
      carruselRef.current.style.transform = `translateX(-${indiceInicial * 20}%)`;
    }
  }, [indiceInicial]);

  useEffect(() => {
    const intervalo = setInterval(avanzar, 5000); // Avanza cada 5 segundos
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="carrusel-container">
      <button onClick={retroceder} className="carrusel-boton izquierda">{'<'}</button>
      <div className="carrusel-viewport">
        <div 
          className="carrusel-productos"
          ref={carruselRef}
        >
          {productos.map((producto) => (
            <div key={producto.id} className="producto-item">
              <img src={producto.imagen} alt={producto.nombre} draggable="false" />
              <p>{producto.nombre}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={avanzar} className="carrusel-boton derecha">{'>'}</button>
    </div>
  );
}