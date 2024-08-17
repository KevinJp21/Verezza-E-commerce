import './StartHome.css'
import imgStartHome1 from '../../assets/images/StartSectionHome/banner01.webp'
import imgStartHome2 from '../../assets/images/StartSectionHome/banner04.webp'
import imgStartHome3 from '../../assets/images/StartSectionHome/banner02.webp'

export default function StartHome() {
  return( 
  <section className="StartHomeContainer">
    <picture className="StartHomeImg">
        <img className='img1' src={imgStartHome1} alt="Olga Lucía Cortes" />
        <img className='img2' src={imgStartHome2} alt="Olga Lucía Cortes" />
        <img className='img3' src={imgStartHome3} alt="Olga Lucía Cortes" />
    </picture>
    <div className="StartHomeWrapper">
      
    </div>
  </section>
  )
}