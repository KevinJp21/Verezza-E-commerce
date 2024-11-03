import './AtelierPage.css';
import { useTranslation } from 'react-i18next';

export default function AtelierPage() {
    const { t } = useTranslation();
    return (
        <section className="AtelierContainer">
            <div className="atelierFormWrapper">
                <form action="/api/sendEmail" method="post" className="atelierForm">
                    <div className="formGroup">
                        <div className="inputContainer">
                            <label htmlFor="name">{t("atelier.name")}</label>
                            <input type="text" name="name" placeholder={t("atelier.placeholder_name")} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <div className="inputContainer">
                            <label htmlFor="email">{t("atelier.email")}</label>
                            <input type="email" name="email" placeholder={t("atelier.placeholder_email")} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <div className="inputContainer">
                            <label htmlFor="phone">{t("atelier.phone")}</label>
                            <input type="text" name="phone" placeholder={t("atelier.placeholder_phone")} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <div className="inputContainer">
                            <label htmlFor="subject">{t("atelier.subject")}</label>
                            <input type="text" name="subject" placeholder={t("atelier.placeholder_subject")} />
                        </div>
                    </div>
                    <div className="formGroup">
                        <div className="inputContainer">
                            <label htmlFor="message">{t("atelier.message")}</label>
                            <textarea name="message" placeholder={t("atelier.placeholder_message")}></textarea>
                        </div>
                    </div>
                    <button type="submit" className='btn-tertiary'><span>{t("atelier.button")}</span></button>
                </form>
            </div>
        </section>
    );
}
