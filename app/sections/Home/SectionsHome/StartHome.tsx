import { useState, useEffect } from 'react'
import { MetaFunction } from '@remix-run/node'
import './StartHome.css'
import imgStartHome1 from '~/assets/images/StartSectionHome/banner01.webp'
import imgStartHome2 from '~/assets/images/StartSectionHome/banner04.webp'
import imgStartHome3 from '~/assets/images/StartSectionHome/banner02.webp'
import imgStartHome4 from '~/assets/images/StartSectionHome/banner03.webp'


export default function StartHome() {
  
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
  }

  useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
  }, [])

  return( 
  <section className="StartHomeContainer">
    <div className="StartHomeImg">
        <img className='img1' src={imgStartHome1} alt="Olga Lucía Cortes" loading={isMobile ? 'lazy' : 'eager'} decoding={isMobile ? 'async' : 'auto'} width={800} height={430}/>
        <img className='img2' src={imgStartHome2} alt="Olga Lucía Cortes" loading="lazy" decoding="async" width={138} height={75}/>
        <img className='img3' src={imgStartHome3} alt="Olga Lucía Cortes" loading="lazy" decoding="async" width={138} height={75}/>
        <img className='img4' src={imgStartHome4} alt="Olga Lucía Cortes" loading="lazy" decoding="async" width={138} height={75}/>
    </div>
    <div className="StartHomeWrapper">
      <h1>Descubre la moda que te hará sentir única</h1>
      <h2>¡Bienvenida a Olga Lucía Cortés!</h2>
      <a href='#'><span>Explora ahora</span></a>
    </div>
  </section>
  )
}