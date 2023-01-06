import React, { createContext } from 'react';

interface Authentication {
    user: any
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext<Authentication>({user: null});


// export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    // const [state, dispatch] = useReducer()
//     return {children};
// }