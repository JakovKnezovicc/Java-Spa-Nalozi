import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Toast,
} from "reactstrap";
import { useState } from "react";
import axios from "../components/AxiosConfig";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const NewMap = () => {
  const navigate = useNavigate();

  const [mapa, setMapa] = useState({
    naziv: null,
    poduzece: null,
    korisnik: {
      id: null,
    },
  });

  const { naziv, poduzece } = mapa;

  const handleMap = async () => {
    const regex = new RegExp("^[A-Z]{3}$");
    if(mapa.poduzece.match(regex)) {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/mape/novi",
        mapa
      );

      console.log("res od necega", res);
      toast.success("Mapa uspjesno kreiarana");
    } catch (error) {
      if (error) throw error;
    }
  } else {
    return toast.error("Poduzece mora sadrzavati 3 VELIKA slova")
  }
};
  useEffect(() => {
    const getKorisnikId = async () => {
      try {
        let ime = localStorage.getItem("username");
        console.log("ime BEFORE: ", ime);
        ime = ime.replace(/^"(.*)"$/, "$1");
        console.log("ime AFTER: ", ime);
        const res = await axios.get(
          `http://localhost:8080/api/korisnici/${ime}`
        );
        console.log("api mape", res);
        setMapa({
          ...mapa,
          korisnik: {
            id: res.data,
          },
        });
      } catch (error) {
        if (error) throw error;
      }
    };

    getKorisnikId();
  }, []);

  return (
    <>
      <Navigation />
      <Container style={{ display: "flex", height: "100%" }}>
        <Form style={{ height: "500px", width: "100%" }}>
          <FormGroup>
            <Label>Naziv</Label>
            <Input
              placeholder="Unesi..."
              type="text"
              value={naziv}
              onChange={(e) =>
                setMapa((prevObj) => ({ ...prevObj, naziv: e.target.value }))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Poduzeće</Label>
            <Input
              placeholder="Unesi..."
              type="text"
              value={poduzece}
              onChange={(e) =>
                setMapa((prevObj) => ({ ...prevObj, poduzece: e.target.value }))
              }
            />
          </FormGroup>
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => {
              handleMap();
            }}
          >
            Spremi
          </Button>
        </Form>
        <ToastContainer />
      </Container>  
    </>
  );
};

export default NewMap;
