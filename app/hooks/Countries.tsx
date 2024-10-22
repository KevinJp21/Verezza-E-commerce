import React, { createContext, useContext, useEffect, useState } from 'react';

const CountriesContext = createContext<Array<{ name: string; isoCode: string }>>([]);

// Provider para manejar el estado de autenticación
export const CountriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [countries, setCountries] = useState<Array<{ name: string; isoCode: string }>>([]);

    const fetchCountries = async () => {
        try {
            const response = await fetch('/api/getAvailableCountries');
            const data = await response.json();
            setCountries(data.localization.availableCountries);
        } catch (error) {
            //console.error('Error al obtener el estado de autenticación:', error);
            setCountries([]);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <CountriesContext.Provider value={countries}>
            {children}
        </CountriesContext.Provider>
    );
};

// Hook para utilizar el contexto
export const useCountries = () => {
    return useContext(CountriesContext);
};
