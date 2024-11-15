import './AtelierPage.css';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import CollageAtelier from '../../assets/images/Atelier/Collage Atelier.webp';

interface FetcherData {
    error?: string;
    message?: string;
}

export default function AtelierPage() {
    const { t } = useTranslation();
    const fetcher = useFetcher();
    const loading = fetcher.state === 'submitting';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        fetcher.submit(
            formData,
            {
                method: 'POST',
                action: '/api/sendEmail',
                encType: "application/x-www-form-urlencoded"
            }
        );
    };

    return (
        <section className="AtelierContainer">
            <div className="AtelierWrapper">
                <div className="AtelierContent">
                    <h2>{t("atelier.title")}</h2>
                    <p>{t("atelier.p1")}</p>
                    <p>{t("atelier.p2")}</p>
                    <p>{t("atelier.p3")}</p>
                </div>
                <img src={CollageAtelier} alt="Collage Atelier" />
            </div>
            <div className="atelierFormWrapper">
                <div className="AtelierFormDescription">
                    <h2 className='atelierFormTitle'>{t("atelier.form_title")}</h2>
                    <p>{t("atelier.form_p1")}</p>
                    <p>{t("atelier.form_p2")}</p>
                </div>
                <fetcher.Form className="atelierForm" onSubmit={handleSubmit}>
                    {(fetcher.data as FetcherData)?.message === "EMAIL_SENT" && (
                        <p className='SuccessMsg'>Correo enviado con éxito</p>
                    )}
                    {(fetcher.data as FetcherData)?.error === "EMAIL_ERROR_SEND" && (
                        <p className='ErrorMsg'>Ha ocurrido un error al enviar el correo, intente nuevamente más tarde</p>
                    )}
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
                    <button type="submit" className='btn-tertiary' disabled={loading}>
                        <span>{t("atelier.button")}</span>
                    </button>
                </fetcher.Form>
            </div>
        </section>
    );
}
