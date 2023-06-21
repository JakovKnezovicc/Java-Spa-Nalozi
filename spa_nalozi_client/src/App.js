import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Workspace from "./pages/Workspace";
import NewMap from "./pages/NewMap";
import Edit from "./pages/Edit";
import { useEffect, useState, useRef } from "react";
import AddUser from "./pages/AddUser";

function App() {
  const [mapaId, setMapaId] = useState(null);
  const [user, setUser] = useState(null);

  const handleToken = (newToken, username) => {
    console.log("This is new token:", newToken);
    localStorage.setItem("token", JSON.stringify(newToken));
    localStorage.setItem("username", JSON.stringify(username));
  };

  return (
    <Router>
      <Routes>
        <Route element={<Index handleToken={handleToken} />} path="/" />
        <Route
          element={<Workspace setMapaId={setMapaId} />}
          path="/radno-polje"
        />
        <Route element={<NewMap />} path="/radno-polje/nova-mapa" />
        <Route element={<Edit mapaId={mapaId} />} path="/radno-polje/uredi/:id" />
        <Route element={<AddUser />} path="/korisnici/novi"/>
      </Routes>
    </Router>
  );
}

export default App;