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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const [user, setUser] = useState({
    ime: null,
    prezime: null,
    korisnickoIme: null,
    lozinka: null,
  });
  const inputGroupStyle = {
    margin: "5px 0",
    padding: "0",
  };

  const registerUser = async () => {
    if (
      validateName(user.ime) &&
      validateName(user.prezime) &&
      validateUsername(user.korisnickoIme) && 
      validatePassword(user.lozinka)
    ) {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/register",
          user
        );
        setUser({
          ime: null,
          prezime: null,
          korisnickoIme: null,
          lozinka: null,
        });
        toast.success("Novi korisnik uspjesno kreiran...");
      } catch (error) {
        if (error) toast.error("Nesto je poslo po krivu...");
      }
    }
  };

  const validateName = (name) => {
   const regex = new RegExp("^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");
  
   try {
    if(name.match(regex)) {
      return true;
     } 
     return toast.error("Nešto je u krivu s vašim imenom ili prezimenom")
   } catch (error) {
    toast.error("Ime i prezime moraju imati najmanje 3 slova");
   }
  };

  const validateUsername = (name) => {
    const regex = new RegExp("^(?=.{6,20}$)(?![_.])[a-zA-Z0-9._]+(?<![_.])$");
   
    try {
      if(name.match(regex)) {
        return true;
       } 
       return toast.error("Nešto je u krivu s vašim korisničkim imenom")
     } catch (error) {
      toast.error("Korisnicko ime mora sadrzavati izmedju 6 i 20 slova.");
     }
  };

  const validatePassword = (password) => {
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");

    try {
      if(password.match(regex)) {
        return true;
       } 
       return toast.error("Nešto je u krivu s vašom lozinkom")
     } catch (error) {
      toast.error("Lozinka mora imati 8 ili više slova i barem jedan broj.");
     }
  }
  return (
    <>
      <Navigation />
      <Container
        fluid
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "whitesmoke",
        }}
      >
        <Row
          style={{
            backgroundColor: "white",
            width: "500px",
            height: "450px",
            padding: "10px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>KREIRAJ KORISNIKA</h1>
          <InputGroup style={inputGroupStyle}>
            <InputGroupText>Ime</InputGroupText>
            <Input
              placeholder="Unesi"
              value={user.ime}
              onChange={(e) => setUser({ ...user, ime: e.target.value })}
            />
          </InputGroup>
          <InputGroup style={inputGroupStyle}>
            <InputGroupText>Prezime</InputGroupText>
            <Input
              placeholder="Unesi"
              value={user.prezime}
              onChange={(e) => setUser({ ...user, prezime: e.target.value })}
            />
          </InputGroup>
          <InputGroup style={inputGroupStyle}>
            <InputGroupText>Korisnicko ime</InputGroupText>
            <Input
              placeholder="Unesi"
              value={user.korisnickoIme}
              onChange={(e) =>
                setUser({ ...user, korisnickoIme: e.target.value })
              }
            />
          </InputGroup>
          <InputGroup style={inputGroupStyle}>
            <InputGroupText>Lozinka</InputGroupText>
            <Input
              placeholder="Unesi"
              type="password"
              value={user.lozinka}
              onChange={(e) => setUser({ ...user, lozinka: e.target.value })}
            />
          </InputGroup>
          <Button color="primary" onClick={() => registerUser()}>
            Spremi
          </Button>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AddUser;
