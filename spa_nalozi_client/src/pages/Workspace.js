import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import {
  AiFillFolder,
  AiFillPlusCircle,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "../components/AxiosConfig";
import { useAuth } from "../context/AuthContext";
const Workspace = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/mape/izbrisi/${id}`
      );
      console.log("handleDelete res", res);
      setRefresh(true);
    } catch (error) {
      if (error) throw error;
    }
  };

  const fetchMaps = async () => {
    try {
      console.log("moj token: " + localStorage.getItem("token"));

      const res = await axios.get("http://localhost:8080/api/mape/svi");
      console.log(res);
      setMaps(res.data);
      setIsLoading(false);
      setRefresh(false);
    } catch (error) {
      if (error) throw error;
    }
  };

  useEffect(() => {
    refresh && fetchMaps();
  }, [refresh]);

 
  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "whitesmoke",
        padding: 0,
      }}
    >
      <Navigation />

      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: "250px",
            height: "250px",
            cursor: "pointer",
            margin: "0 10px",
          }}
          onClick={() => navigate("/radno-polje/nova-mapa")}
        >
          <AiFillPlusCircle style={{ fontSize: "3rem" }} />
          <div>Dodaj novu mapu</div>
        </div>
        {!isLoading &&
          maps.map((item) => (
            <div
              style={{
                backgroundColor: "white",
                width: "250px",
                height: "250px",
                cursor: "pointer",
                margin: "0 5px",
              }}
            >
              <AiFillFolder style={{ fontSize: "3rem", color: "darkorange" }} />
              <div>{item.naziv}</div>
              <div>{item.datumKreiranja.slice(0, 10)}</div>
              <div>
                Kreator: {item.korisnik.ime} {item.korisnik.prezime}
              </div>
              <div>Poduzeće: {item.poduzece}</div>

              <div style={{display: "flex", backgroundColor: "lightgrey", justifyContent: "space-around", alignItems: "center"}}>
                <div>
                  <AiFillEdit style={{ color: "black", fontSize: "3rem"}} onClick={() => {
                    navigate(`/radno-polje/uredi/${item.id}`);
                  }}/>
                </div>

                {localStorage.getItem("isAdmin") && (
                  <div>
                    <AiFillDelete
                      onClick={() => handleDelete(item.id)}
                      style={{ color: "black", fontSize: "3rem"}}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Workspace;
