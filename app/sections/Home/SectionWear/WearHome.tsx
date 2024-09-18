import { useTranslation } from 'react-i18next'
import './WearHome.css'

import imgWearComplements from '~/assets/images/SectionWear/complementos.webp'
import imgWearComplements2 from '~/assets/images/SectionWear/Complementos2.webp'
import imgWearComplements3 from '~/assets/images/SectionWear/cinturonBeauty1.webp'
import imgWearComplements4 from '~/assets/images/SectionWear/cinturonBeauty2.webp'



export default function WearHome(){
    const { t } = useTranslation()
    return(
        <section className='WearHomeContainer'>
            <h2>{t("home.section_wear.title")}</h2>
            <div className='WearHomeWrapper'>
                <div className='WearImg img1'>
                    <img className='img1-1' src={imgWearComplements} alt="Imagen complementos olga lucia cortes" loading="lazy" decoding="async" width={780} height={1200} />
                    <img className='img1-2' src={imgWearComplements2} alt="Imagen complementos olga lucia cortes" loading="lazy" decoding='async' width={780} height={1200} />
                    <div className='WearImgText'>
                        <h3>{t("home.section_wear.promo_1.title")}</h3>
                        <p>{t("home.section_wear.promo_1.description")}</p>
                        <a className="btn-primary" href="#">{t("home.section_wear.button")}</a>
                    </div>
                </div>

                <div className='WearImg img2'>
                    <img className='img1-1' src={imgWearComplements3} alt="Cinturon beauty Olga Lucia Cortes" loading='lazy' decoding='async' width={780} height={1200} />
                    <img className='img1-2' src={imgWearComplements4} alt="Cinturon beauty Olga Lucia Cortes" loading='lazy' decoding='async' width={780} height={1200} />
                    <div className='WearImgText'>
                        <h3>{t("home.section_wear.promo_2.title")}</h3>
                        <p>{t("home.section_wear.promo_2.description")}</p>
                        <a className="btn-primary" href="#">{t("home.section_wear.button")}</a>
                    </div>
                </div>
            </div>
        </section>
    )
}