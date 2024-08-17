import './StartHome.css'
import imgStartHome1 from '~/assets/images/StartSectionHome/banner01.webp'
import imgStartHome2 from '~/assets/images/StartSectionHome/banner04.webp'
import imgStartHome3 from '~/assets/images/StartSectionHome/banner02.webp'
import imgStartHome4 from '~/assets/images/StartSectionHome/banner03.webp'

export default function StartHome() {
  return( 
  <section className="StartHomeContainer">
    <div className="StartHomeImg">
        <img className='img1' src={imgStartHome1} alt="Olga Lucía Cortes" loading="eager" />
        <img className='img2' src={imgStartHome2} alt="Olga Lucía Cortes" loading="eager" />
        <img className='img3' src={imgStartHome3} alt="Olga Lucía Cortes" loading="eager" />
        <img className='img4' src={imgStartHome4} alt="Olga Lucía Cortes" loading="eager" />
    </div>
    <div className="StartHomeWrapper">
      <h1>Descubre la moda que te hará sentir única</h1>
      <h2>¡Bienvenida a Olga Lucía Cortés!</h2>
      <a href='#'><span>Explora ahora</span></a>
    </div>
  </section>
  )
}