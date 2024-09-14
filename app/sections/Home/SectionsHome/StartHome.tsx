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
        <img className='img1' src={isMobile ? imgStartHome1 : imgStartHome1} alt="Imagen modelo de Olga Lucía Cortes" loading='eager' decoding='async' width={800} height={430} />
      </div>
      <div className="StartHomeWrapper">
        <div className="StartHomeContent">
          <h1>{t("home.start_home.title")}</h1>
          <h2>{t("home.start_home.subtitle")}</h2>
          <a className='link_btn' href='#'>{t("home.start_home.button")}</a>
        </div>
      </div>
    </section>
  )
}