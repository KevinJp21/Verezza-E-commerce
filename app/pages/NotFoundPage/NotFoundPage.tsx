import './NotFoundPage.css'
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <div className="not-found-divider"></div>
      <p className="not-found-text">{t('page_not_found.title')}</p>
      <p className="not-found-subtext">{t('page_not_found.description')}</p>
    </div>
  );
}