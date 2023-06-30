import { createContext, useContext, useState, useEffect } from 'react'
const Auth = createContext();

export const AuthContext = ({children}) => {

  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = async() => {
    localStorage.clear();
    setIsLoggedIn(false);  
  }

  useEffect(()=>{
    if(localStorage.getItem("token") === null) {
      localStorage.clear();
      return setIsLoggedIn(false);
      } setIsLoggedIn(true)

  }, [handleLogout]);

  return (
    <Auth.Provider value={{isLoggedIn, setIsLoggedIn, handleLogout}}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => {
  return useContext(Auth);
}
