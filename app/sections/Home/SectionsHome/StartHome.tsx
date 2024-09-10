import { useState, useEffect } from 'react'
import './StartHome.css'
import imgStartHome1 from '~/assets/images/StartSectionHome/banner01.webp'
import imgStartHome2 from '~/assets/images/StartSectionHome/banner04.webp'


export default function StartHome() {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => window.innerWidth < 768
    setIsMobile(checkIsMobile())

    const handleResize = () => {
      setIsMobile(checkIsMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="StartHomeContainer">
      <div className="StartHomeImg">
        <img className='img1' src={isMobile ? imgStartHome2 : imgStartHome1} alt="Imagen modelo de Olga Lucía Cortes" loading='eager' decoding='async' width={800} height={430} />
      </div>
      <div className="StartHomeWrapper">
        <div className="StartHomeContent">
          <h1>Descubre la moda que te hará sentir única</h1>
          <h2>¡Bienvenida a Olga Lucía Cortés!</h2>
          <a className='link_btn' href='#'>Explora ahora</a>
        </div>
      </div>
    </section>
  )
}