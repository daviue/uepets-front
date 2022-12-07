import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});
export const useUserContext = () => React.useContext(UserContext);

// Provider
export const UserContextProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		if (!isAuth) {
			sessionStorage.removeItem('token');
		}
	}, [isAuth]);
	return (
		<UserContext.Provider value={{isAuth, setIsAuth}}>{children}</UserContext.Provider>
	);
};