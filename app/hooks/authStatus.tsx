import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(false);

// Provider para manejar el estado de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const fetchAuthStatus = async () => {
        try {
            const response = await fetch('/api/authStatus');
            const data = await response.json();
            setIsLogged(data.isLogged);
        } catch (error) {
            console.error('Error al obtener el estado de autenticación:', error);
            setIsLogged(false);
        }
    };

    useEffect(() => {
        fetchAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={isLogged}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para utilizar el contexto
export const useAuthStatus = () => {
    return useContext(AuthContext);
};
