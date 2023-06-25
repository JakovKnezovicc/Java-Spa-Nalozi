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
      setIsLoggedIn(false);
      } else{
      setIsLoggedIn(true);
      console.log("Logged in pozvan bok");
    }

    return ()=>{
      setIsLoggedIn(false);
    }
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
