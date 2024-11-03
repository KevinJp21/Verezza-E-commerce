import './OurBrandPage.css';
import { useTranslation } from 'react-i18next';
import OlgaImage from '~/assets/images/imgolgalucia-300x400.jpeg';

export default function OurBrandPage() {
    const { t } = useTranslation();

    return (
    <section className='OurBrandContainer'>
        <div className='OurBrandContent'>
            <div className='OurBrandImage'>
                <img src={OlgaImage} alt="Our Brand" />
            </div>
            <div className='OurBrandText'>
                <h2>{t("ourBrand.title")}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p3') }} />
            </div>
        </div>
    </section>
  )
}
