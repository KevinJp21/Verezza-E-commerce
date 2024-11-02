import './privacy-policyPage.css';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
    const { t } = useTranslation();
    return (
        <section className='PrivacyPolicyContainer'>
            <div className='PrivacyPolicyWrapper container'>
                <h2>{t('privacyPolicyPage.privacyPolicy.title')}</h2>
                <p>{t('privacyPolicyPage.privacyPolicy.p1')}</p>
                <p>{t('privacyPolicyPage.privacyPolicy.p2')}</p>
                <p>{t('privacyPolicyPage.privacyPolicy.p3')}</p>
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.privacyPolicy.p4') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.privacyPolicy.li1P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.privacyPolicy.li2P1') }} />
                    </li>
                </ul>
            </div>
            <div className='refundPolicyContainer container'>
                <h2>{t('privacyPolicyPage.refundPolicy.title')}</h2>
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p3') }} />
                <ul className='list-style-disc'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li1P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li1P2') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li1P3') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li1P4') }} />
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p4') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P1') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P2') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2-1P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2-1P2') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2-1P3') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2-1P4') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2-1P5') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P3') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P4') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2-2P1') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P5') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P6') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P7') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P8') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P9') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P10') }} />
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li2P11') }} />
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p5') }} />
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p6') }} />
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p7') }} />
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p8') }} />
                <ul className='list-style-numeric'>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3P1') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-1P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-1P2') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3P2') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P2') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P3') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P4') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P5') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P6') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P7') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P8') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-2P9') }} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3P3') }} />
                        <ul className='list-style-disc'>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-3P1') }} />
                            </li>
                            <li>
                                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.li3-3P2') }} />
                            </li>
                        </ul>
                    </li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t('privacyPolicyPage.refundPolicy.p9') }} />
            </div>
        </section>
    )
}

