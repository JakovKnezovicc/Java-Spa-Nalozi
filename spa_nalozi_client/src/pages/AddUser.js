import React from "react";
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
const AddUser = () => {

    const inputGroupStyle = {
        margin: "5px 0",
        padding: "0"
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
          <Input placeholder="Unesi" />
        </InputGroup>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Prezime</InputGroupText>
          <Input placeholder="Unesi" />
        </InputGroup>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Korisnicko ime</InputGroupText>
          <Input placeholder="Unesi" />
        </InputGroup>
        <InputGroup style={inputGroupStyle}>
          <InputGroupText>Lozinka</InputGroupText>
          <Input placeholder="Unesi" type="password" /> 
          
        </InputGroup>
        <Button color="primary" >Spremi</Button>
      </Row>
    </Container>
    </>
  );
};

export default AddUser;
