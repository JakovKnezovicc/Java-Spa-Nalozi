import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from "./pages/Index";
import Workspace from "./pages/Workspace";
import NewMap from "./pages/NewMap";
import Edit from "./pages/Edit";
import { useEffect, useState, useRef } from "react";
import AddUser from "./pages/AddUser";
import DeleteUser from "./pages/DeleteUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToken = (newToken, username) => {
    console.log("This is new token:", newToken);
    localStorage.setItem("token", JSON.stringify(newToken));
    localStorage.setItem("username", JSON.stringify(username));

    if(localStorage.getItem("token") === null) {
      setIsLoggedIn(false)
      } else{
      setIsLoggedIn(true);
    }

  };

  useEffect(()=>{
    console.log("useEffect app", isLoggedIn);
    console.log("useEffect storage, ", localStorage.getItem("token"));
    if(localStorage.getItem("token") === null) {
      setIsLoggedIn(false)
      } else{
      setIsLoggedIn(true);
    }

    return ()=>{
      setIsLoggedIn(false);
    }
  }, []);

  if(!isLoggedIn) {
    return(
      <Router>
      <Routes>
        <Route element={<Index handleToken={handleToken} isLoggedIn={isLoggedIn}/>} path="/" />
      </Routes>
    </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route
          element={<Workspace />}
          path="/radno-polje"
        />
        <Route element={<NewMap />} path="/radno-polje/nova-mapa" />
        <Route element={<Edit />} path="/radno-polje/uredi/:id" />
        <Route element={<AddUser />} path="/korisnici/novi"/>
        <Route element={<DeleteUser />} path="/korisnici/izbrisi" />
      </Routes>
    </Router>
  );
}

export default App;
