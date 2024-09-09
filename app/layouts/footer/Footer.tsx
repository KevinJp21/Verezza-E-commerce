import { useState, useEffect } from 'react';
import './Footer.css'

export default function Footer() {

  const [isSelectCurrencyOpen, setIsSelectCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('');

  const [isSelectLocationOpen, setIsSelectLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Colombia');

  const [isSelectLanguageOpen, setIsSelectLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Español');

  const currentYear = new Date().getFullYear();

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
      } else {
        // Valores predeterminados si no hay nada en localStorage
        setSelectedCurrencySymbol('COP');
        setSelectedCurrency('Pesos Colombianos');
        setSelectedLanguage('Español')
        localStorage.setItem('selectedCurrencySymbol', 'COP');
        localStorage.setItem('selectedCurrency', 'Pesos Colombianos');
        localStorage.setItem('selectedLanguage', 'Español')
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
    window.location.reload();
  }

  return (
    <footer className='Footer'>
      <div className="FooterContainer">
      <div className="FooterHeader">
        <div className="footerSelectorWrapper">
          <div className="FooterSelector CurrencySelector">
            <h3>ELIGE TU DIVISA</h3>
            <div className={`customSelect ${isSelectCurrencyOpen ? 'open' : ''}`}>
              <div className="selectHeader" onClick={toggleSelectCurrency}>
                <div className="currencyWrapper">
                  <div className="currencyDetails">
                    <span>{selectedCurrency || "Elige tu divisa"}</span>
                    <span>{selectedCurrencySymbol || ""}</span>
                  </div>
                  <span className="arrow"></span>
                </div>
              </div>
              <ul className="optionsList">
                <li className="option" onClick={() => handleCurrencyClick('Pesos Colombianos', 'COP')}>
                  <span>Pesos Colombianos</span>
                  <span>COP</span>
                </li>
                <li className="option" onClick={() => handleCurrencyClick('Dólares', 'USD')}>
                  <span>Dólares</span>
                  <span>USD</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="FooterSelector LocationSelector">
            <h3>ELIGE TU UBICACIÓN/REGION</h3>
            <div className={`customSelect ${isSelectLocationOpen ? 'open' : ''}`}>
              <div className="selectHeader" onClick={toggleSelectLocation}>
                <div className="currencyWrapper">
                  <div className="currencyDetails">
                    <span>{selectedLocation || "Elige tu ubicación"}</span>
                  </div>
                  <span className="arrow"></span>
                </div>
              </div>
              <ul className="optionsList">
                <li className="option" onClick={() => handleLocationClick('Colombia')}>
                  <span>Colombia</span>
                </li>
                <li className="option" onClick={() => handleLocationClick('Estados Unidos')}>
                  <span>Estados Unidos</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="FooterSelector LocationSelector">
            <h3>ELIGE TU LENGUAJE</h3>
            <div className={`customSelect ${isSelectLanguageOpen ? 'open' : ''}`}>
              <div className="selectHeader" onClick={toggleSelectLanguage}>
                <div className="currencyWrapper">
                  <div className="currencyDetails">
                    <span>{selectedLanguage || "Elige tu idioma"}</span>
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
          <h3>INFORMACIÓN</h3>
          <ul className='FooterInfoList'>
            <li className='FooterInfoItem'>
              <a href=""><span>Atelier</span></a>
            </li>
            <li className='FooterInfoItem'>
              <a href=""><span>Nuestra marca</span></a>
            </li>
            <li className='FooterInfoItem'>
              <a href=""><span>Politica de privacidad</span></a>
            </li>
            <li className='FooterInfoItem'>
              <a href=""><span>Devoluciones/reembolsos</span></a>
            </li>
          </ul>
        </div>
      </div>

      <div className="FooterBottom">
        <span>© {currentYear} Olga Lucía Cortés.</span>
      </div>
      </div>
    </footer>
  );
}