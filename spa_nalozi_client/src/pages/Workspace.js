import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { AiFillFolder, AiFillPlusCircle } from "react-icons/ai";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "../components/AxiosConfig";
const Workspace = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        console.log("moj token: " + localStorage.getItem("token"));

        const res = await axios.get("http://localhost:8080/api/mape/svi");
        console.log(res);
        setMaps(res.data);
      } catch (error) {
        if(error) throw error;
      }
    };

    fetchMaps();
  }, []);

  useEffect(() => {
    if (maps.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [maps]);
  return (
    <Container
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "whitesmoke",
        padding: 0
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
              onClick={() => {
                navigate(`/radno-polje/uredi/${item.id}`);
              }}
            >
              <AiFillFolder style={{ fontSize: "3rem" }} />
              <div>{item.naziv}</div>
              <div>{item.datumKreiranja.slice(0, 10)}</div>
              <div>Broj dokumenata i naloga: 51</div>
              <div>Kreator: Marko Ivanovic</div>
              <div>Poduzeće: {item.poduzece}</div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Workspace;
