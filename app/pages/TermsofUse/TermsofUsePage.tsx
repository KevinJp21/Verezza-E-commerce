import './TermsofUsePage.css';
import { useTranslation } from 'react-i18next';

export default function TermsofUse() {
    const { t } = useTranslation();
    return (
        <section className='PrivacyPolicyContainer'>
            <div className='PrivacyPolicyWrapper container'>
                <h2>{t('TermsofUse.privacyPolicy.title')}</h2>
                <p>{t('TermsofUse.privacyPolicy.p1')}</p>
                <p>{t('TermsofUse.privacyPolicy.p2')}</p>
                <p>{t('TermsofUse.privacyPolicy.p3')}</p>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.privacyPolicy.p4') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.privacyPolicy.li1P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.privacyPolicy.li2P1') }} />
                    </li>
                </ul>
            </div>
            <div className='refundPolicyContainer container'>
                <h2>{t('TermsofUse.refundPolicy.title')}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p3') }} />
                <ul className='list-style-disc'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li1P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li1P2') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li1P3') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li1P4') }} />
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p4') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P2') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2-1P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2-1P2') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2-1P3') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2-1P4') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2-1P5') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P3') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P4') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2-2P1') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P5') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P6') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P7') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P8') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P9') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P10') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li2P11') }} />
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p5') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p6') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p7') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p8') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3P1') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-1P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-1P2') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3P2') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P2') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P3') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P4') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P5') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P6') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P7') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P8') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-2P9') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3P3') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-3P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.li3-3P2') }} />
                            </li>
                        </ul>
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.refundPolicy.p9') }} />
            </div>
            <div className='termsAndConditionsContainer container'>
                <h2>{t('TermsofUse.termsAndConditions.title')}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p3') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p4') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p5') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p6') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p7') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.li1P1') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.li1-1P1') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.li1P2') }} />
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p8') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p9') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p10') }} />
                <h2>{t('TermsofUse.termsAndConditions.title2')}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p11') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p12') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p13') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p14') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p15') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p16') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p17') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p18') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p19') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p20') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.termsAndConditions.p21') }} />
            </div>
            <div className="paymentAndCollections container">
                <h2>{t('TermsofUse.paymentAndCollections.title')}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.p3') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li1P1') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li1-1P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li1-1P2') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li1-1P3') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li1P2') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li1-2P1') }} />
                            </li>
                        </ul>
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.p4') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.p5') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li2P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li2P2') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li2P3') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.paymentAndCollections.li2P4') }} />
                    </li>
                </ul>
            </div>
            <div className="restrictionsContainer container">
                <h2>{t('TermsofUse.restrictions.title')}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.restrictions.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('TermsofUse.restrictions.p2') }} />
            </div>
        </section>
    )
}

