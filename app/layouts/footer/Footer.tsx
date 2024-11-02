import { useState, useEffect } from 'react';
import './Footer.css'

import { useTranslation } from "react-i18next";
import { facebookIcon, instagramIcon, tiktokIcon } from '~/assets/icons/icons';

export default function Footer() {

  const [isSelectCurrencyOpen, setIsSelectCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('');

  const [isSelectLocationOpen, setIsSelectLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const [isSelectLanguageOpen, setIsSelectLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');


  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();

  //Default values
  useEffect(() => {
    setSelectedCurrency(localStorage.getItem('selectedCurrency') || "");
    setSelectedCurrencySymbol(localStorage.getItem('selectedCurrencySymbol') || "");
    setSelectedLocation(localStorage.getItem('selectedLocation') || "");
    setSelectedLanguage(localStorage.getItem('selectedLanguage') || "");
  }, []);

  // Currency selector
  const toggleSelectCurrency = () => {
    setIsSelectCurrencyOpen(!isSelectCurrencyOpen);
    setIsSelectLocationOpen(false);
    setIsSelectLanguageOpen(false);
  }

  const handleCurrencyClick = (currency: string, symbol: string) => {
    setSelectedCurrency(currency);
    setSelectedCurrencySymbol(symbol);
    setIsSelectCurrencyOpen(false);
    localStorage.setItem('selectedCurrency', currency);
    localStorage.setItem('selectedCurrencySymbol', symbol);
    window.location.reload();
  }

  // Location selector

  const toggleSelectLocation = () => {
    setIsSelectLocationOpen(!isSelectLocationOpen);
    setIsSelectCurrencyOpen(false);
    setIsSelectLanguageOpen(false);
  }

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
    setIsSelectLocationOpen(false);
    localStorage.setItem('selectedLocation', location);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSymbol = localStorage.getItem('selectedCurrencySymbol');
      const storedCurrency = localStorage.getItem('selectedCurrency');
      const storedLanguaje = localStorage.getItem('selectedLanguage');
      if (storedSymbol && storedCurrency && storedLanguaje) {
        setSelectedCurrencySymbol(storedSymbol);
        setSelectedCurrency(storedCurrency);
        setSelectedLanguage(storedLanguaje);
      }

      const storedLocation = localStorage.getItem('selectedLocation');
      if (storedLocation) {
        setSelectedLocation(storedLocation);
      }
    }
  }, []);

  // Language selector
  const toggleSelectLanguage = () => {
    setIsSelectLanguageOpen(!isSelectLanguageOpen);
    setIsSelectLocationOpen(false);
    setIsSelectCurrencyOpen(false);
  }

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
    setIsSelectLanguageOpen(false);
    localStorage.setItem('selectedLanguage', language);

    // Cambiar el idioma de i18next
    const newLang = language === 'Español' ? 'es' : 'en';
    i18n.changeLanguage(newLang);

    // Actualizar el atributo lang del HTML
    document.documentElement.lang = newLang;

    // Recargar la página sin parámetros
    window.location.href = window.location.pathname;
  }

  return (
    <footer className='Footer'>
      <div className="FooterContainer">
        <div className="FooterHeader">
          <div className="footerSelectorWrapper">
            <div className="FooterSelector CurrencySelector">
              <h3>{t("footer.currency.title")}</h3>
              <div className={`customSelect ${isSelectCurrencyOpen ? 'open' : ''}`}>
                <div className="selectHeader" onClick={toggleSelectCurrency}>
                  <div className="currencyWrapper">
                    <div className="currencyDetails">
                      <span>{selectedCurrency || t("footer.currency.placeholder")}</span>
                      <span>{selectedCurrencySymbol || ""}</span>
                    </div>
                    <span className="arrow"></span>
                  </div>
                </div>
                <ul className="optionsList">
                  <li className="option" onClick={() => handleCurrencyClick("Pesos Colombianos", 'COP')}>
                    <span>Pesos Colombianos</span>
                    <span>COP</span>
                  </li>
                  <li className="option" onClick={() => handleCurrencyClick("US Dollars", 'USD')}>
                    <span>US Dollars</span>
                    <span>USD</span>
                  </li>
                  <li className="option" onClick={() => handleCurrencyClick("Euros", 'EUR')}>
                    <span>Euros</span>
                    <span>EUR</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="FooterSelector LanguajeSelector">
              <h3>{t("footer.language.title")}</h3>
              <div className={`customSelect ${isSelectLanguageOpen ? 'open' : ''}`}>
                <div className="selectHeader" onClick={toggleSelectLanguage}>
                  <div className="currencyWrapper">
                    <div className="currencyDetails">
                      <span>{selectedLanguage || t("footer.language.placeholder")}</span>
                    </div>
                    <span className="arrow"></span>
                  </div>
                </div>
                <ul className="optionsList">
                  <li className="option" onClick={() => handleLanguageClick('Español')}>
                    <span>Español</span>
                  </li>
                  <li className="option" onClick={() => handleLanguageClick('English')}>
                    <span>English</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="FooterInfoWrapper">
            <div className="FooterInfo">
              <h3>{t("footer.info.title")}</h3>
              <ul className='FooterInfoList'>
                <li className='FooterInfoItem'>
                  <a href=""><span>{t("footer.info.links.atelier")}</span></a>
                </li>
                <li className='FooterInfoItem'>
                  <a href=""><span>{t("footer.info.links.our_brand")}</span></a>
                </li>
                <li className='FooterInfoItem'>
                  <a href="/privacy-policy"><span>{t("footer.info.links.privacy_policy")}</span></a>
                </li>
                <li className='FooterInfoItem'>
                  <a href=""><span>{t("footer.info.links.returns")}</span></a>
                </li>
              </ul>
            </div>
            <div className="FooterSocial">
              <ul className='FooterSocialList'>
                <li className='FooterSocialItem'>
                  <a href="https://www.facebook.com/olgaluciacorteshautecouture" target='_blank'>{facebookIcon()}</a>
                </li>
                <li className='FooterSocialItem'>
                  <a href="https://www.instagram.com/olgaluciacorteshc/" target='_blank'>{instagramIcon()}</a>
                </li>
                <li className='FooterSocialItem'>
                  <a href="https://www.tiktok.com/@olgaluciacorteshc_" target='_blank'>{tiktokIcon()}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="FooterBottom">
          <a className='title-primary' href="/"><span>© {currentYear} OLGA LUCIA CORTES</span></a>
        </div>
      </div>
    </footer>
  );
}