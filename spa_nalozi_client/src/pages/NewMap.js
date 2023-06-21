import React, { useEffect } from "react";
import { Container, Form, FormGroup, Input, Label, Button} from "reactstrap";
import { useState } from "react";
import axios from "../components/AxiosConfig";
import { useNavigate } from "react-router-dom";
const NewMap = () => {
  const navigate = useNavigate();

  const [mapa, setMapa] = useState({
    naziv: null,
    poduzece: null,
    korisnik: {
      id: null
    },
  });

  const {naziv, poduzece} = mapa;

  const handleMap = async() => {
    try {
      const res = await axios.post("http://localhost:8080/api/mape/novi", mapa);

      console.log("res od necega", res);
    } catch (error) {
      if(error) throw error;
    }
  }

  useEffect(()=>{
    const getKorisnikId = async() => {
      try {
        let ime = localStorage.getItem("username");
        console.log("ime BEFORE: ", ime);
        ime = ime.replace(/^"(.*)"$/, '$1')
        console.log("ime AFTER: ", ime);
        const res = await axios.get(`http://localhost:8080/api/korisnici/${ime}`);
        console.log("api mape", res);
        setMapa({...mapa, korisnik: {
          id: res.data
        } })
        
      } catch (error) {
        if(error) throw error;
      }
    }

    getKorisnikId();
  }, []);

  return (
    <Container style={{display: "flex", height: "100%", backgroundColor: "whitesmoke"}}>
      <Form style={{ height: "500px", width: "100%"}}>
        <FormGroup>
          <Label>Naziv</Label>
          <Input
            placeholder="Unesi..."
            type="text"
            value={naziv}
            onChange={(e)=>setMapa(prevObj=>({...prevObj, naziv: e.target.value}))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Poduzeće</Label>
          <Input
            placeholder="Unesi..."
            type="text"
            value={poduzece}
            onChange={(e)=>setMapa(prevObj=>({...prevObj, poduzece: e.target.value}))}
          />
        </FormGroup>
        <Button color="primary" style={{width: "100%"}} onClick={()=>{handleMap(); navigate("/radno-polje")}}>
            Spremi
        </Button>
      </Form>
    </Container>
  );
};

export default NewMap;
