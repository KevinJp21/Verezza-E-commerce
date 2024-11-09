import { useState, useEffect } from 'react'
import './StartHome.css'
import { useTranslation } from 'react-i18next'
import imgStartHome1 from '~/assets/images/StartSectionHome/startHome.avif'
import imgStartHome2 from '~/assets/images/StartSectionHome/banner04.webp'


export default function StartHome() {

  const [isMobile, setIsMobile] = useState(false)
  const { t } = useTranslation()

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
        {/* <img className='img1' src={imgStartHome1} alt="Imagen modelo de Olga Lucía Cortes" loading='eager' decoding='async' width={800} height={430} /> */}
        <video className='video1' src="https://cdn.shopify.com/videos/c/o/v/b261e1c20a9d4e4c81bb7b65eb81baac.webm" autoPlay muted loop playsInline></video>
      </div>
      <div className="StartHomeWrapper">
        <div className="StartHomeContent">
          <h1>{t("home.start_home.title")}</h1>
          <h2>{t("home.start_home.subtitle")}</h2>
          <a className='btn-primary' href='/products'>{t("home.start_home.button")}</a>
        </div>
      </div>
    </section>
  )
}