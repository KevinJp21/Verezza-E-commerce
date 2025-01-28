import './OurBrandPage.css';
import { useTranslation } from 'react-i18next';
import VerezzaImage from '~/assets/images/Verezza-image.png';

export default function OurBrandPage() {
    const { t } = useTranslation();

    return (
    <section className='OurBrandContainer'>
        <div className='OurBrandContent'>
            <div className='OurBrandImage'>
                <img src={VerezzaImage} alt="Our Brand" />
            </div>
            <div className='OurBrandText'>
                <h2>{t("ourBrand.title")}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p3') }} />
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p4') }} />
                <p dangerouslySetInnerHTML={{ __html: t('ourBrand.p5') }} />
            </div>
        </div>
    </section>
  )
}
