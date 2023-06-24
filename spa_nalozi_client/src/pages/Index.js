import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Input, Row, Form, FormGroup, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const Index = ({handleToken, isLoggedIn}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    korisnickoIme: null,
    lozinka: null
  });

  const sendLoginCredentials = async () => {
  
    try {
      const res = await axios.post("http://localhost:8080/api/auth/authenticate", user);
      console.log("this is res", res);
      handleToken(res.data.token, user.korisnickoIme);
    } catch (error) {
      if (error) throw error;
    }
  };


  useEffect(()=>{
    if(localStorage.getItem("token")) navigate("/radno-polje");
  }, [isLoggedIn]);

  return (
    <Container fluid style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "whitesmoke"}}>
      <Row
        style={{
          backgroundColor: "white",
          width: "500px",
          height: "350px",
        }}
      >
        <Form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <FormGroup>
            <Label>
            Korisničko ime
            </Label>
            <Input
            placeholder="Unesi..."
            type="text"
            value={user.korisnickoIme}
            onChange={e => setUser({...user, korisnickoIme: e.target.value})}
            />
        </FormGroup>
        <FormGroup>
            <Label>
            Lozinka
            </Label>
            <Input
            placeholder="Unesi..."
            type="password"
            value={user.lozinka}
            onChange={e => setUser({...user, lozinka: e.target.value})}
            />
        </FormGroup>
        <Button color="success" onClick={()=>sendLoginCredentials()}>Login</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Index;
