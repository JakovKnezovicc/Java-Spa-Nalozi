import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
import Navigation from "../components/Navigation";
import axios from "../components/AxiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const[user, setUser] = useState({
    ime: null,
    prezime: null,
    korisnickoIme: null,
    lozinka: null
  });
  const inputGroupStyle = {
      margin: "5px 0",
      padding: "0"
  }

  const registerUser = async() => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", user);
      setUser({  ime: null,
        prezime: null,
        korisnickoIme: null,
        lozinka: null});
      toast.success("Novi korisnik uspjesno kreiran...");

    } catch (error) {
      if(error) toast.error("Nesto je poslo po krivu...");
    }
  }
  return (
    <>
    <Navigation />
    <Container
      fluid
      style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "whitesmoke"}}
    >
      <Row
        style={{
          backgroundColor: "white",
          width: "500px",
          height: "450px",
          padding: "10px"
        }}
      >
        <h1 style={{textAlign: "center"}}>KREIRAJ KORISNIKA</h1>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Ime</InputGroupText>
          <Input placeholder="Unesi" value={user.ime} onChange={e => setUser({...user, ime: e.target.value})}/>
        </InputGroup>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Prezime</InputGroupText>
          <Input placeholder="Unesi" value={user.prezime} onChange={e => setUser({...user, prezime: e.target.value})}/>
        </InputGroup>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Korisnicko ime</InputGroupText>
          <Input placeholder="Unesi" value={user.korisnickoIme} onChange={e => setUser({...user, korisnickoIme: e.target.value})}/>
        </InputGroup>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Lozinka</InputGroupText>
          <Input placeholder="Unesi" type="password" value={user.lozinka} onChange={e => setUser({...user, lozinka: e.target.value})}/> 
        </InputGroup>
        <Button color="primary" onClick={()=>registerUser()}>Spremi</Button>
      </Row>
      <ToastContainer />
    </Container>
    </>
  );
};

export default AddUser;
