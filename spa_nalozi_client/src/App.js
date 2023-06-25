import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from "./pages/Index";
import Workspace from "./pages/Workspace";
import NewMap from "./pages/NewMap";
import Edit from "./pages/Edit";
import { useEffect, useState, useRef } from "react";
import AddUser from "./pages/AddUser";
import DeleteUser from "./pages/DeleteUser";
import { useAuth } from "./context/AuthContext";
function App() {
  const {isLoggedIn } = useAuth();

  if(!isLoggedIn) {
    return(
      <Router>
      <Routes>
        <Route element={<Index />} path="/" />
      </Routes>
    </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route element={<Index />} path="/" />
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
