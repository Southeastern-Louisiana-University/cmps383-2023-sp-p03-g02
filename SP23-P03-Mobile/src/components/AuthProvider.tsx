import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { deployedAppURL } from '../constants/api';
import useSubscription, { notify } from '../hooks/useSubscription';
import { AuthData, LoginDto, User } from '../types/authentication';

const AuthContext = createContext<AuthData>(null);

const fetchUser = async (cb: (user: User) => void) => {
    axios.get<User>(`${deployedAppURL}/api/authentication/me`, { validateStatus: (status) => ((status >= 200 && status < 300) || status === 401) })
            .then((response) => cb(response.data))
            .catch((error) => {
                console.error("Error while fetching current user", error);
            });
}

export const loginUser = (loginDto: LoginDto) => axios.post<User>(`${deployedAppURL}/api/authentication/login`, loginDto).then((response) => {
    notify("login");
    return response;
});

export const logoutUser = () => axios.post(`${deployedAppURL}/api/authentication/logout`).then((response) => {
    notify("logout");
    return response;
});

type AuthProviderProps = React.PropsWithChildren<{ loginElement: React.ReactNode }>;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, loginElement }) => {
    const [user, setUser] = useState<AuthData>();

    useEffect(() => {
        fetchUser(setUser);
    }, []);

    useSubscription("login", () => {
        fetchUser(setUser);
    });

    useSubscription("logout", () => {
        setUser(null);
    });

    return (
        user !== undefined && (user ? (
            <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
        ) : (
            <>
                {loginElement}
            </>
        ))
    );
}

export const useUser = () => {
    return useContext(AuthContext);
}