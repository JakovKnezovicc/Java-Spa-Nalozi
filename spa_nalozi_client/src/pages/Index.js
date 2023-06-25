import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Input, Row, Form, FormGroup, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/AuthContext";
const Index = () => {
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  const [user, setUser] = useState({
    korisnickoIme: null,
    lozinka: null
  });

  const handleLogin = async() => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/authenticate", user);
      console.log("res resr", res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", user.korisnickoIme);

      console.log("RES DATA ADMIN: ", res.data.admin);
      if(res.data.admin) {
        localStorage.setItem("isAdmin", true);
      }

      setIsLoggedIn(true);
    } catch (error) {
      if (error) {
        return toast.error("Krivo korisnicko ime ili lozinka...")
      }
    }
  }

  useEffect(()=>{
    if(isLoggedIn) {
      navigate("/radno-polje");
    } 
  }, [isLoggedIn]);

  return (
    <Container fluid style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "whitesmoke"}}>
      <Row
        style={{
          backgroundColor: "white",
          width: "500px",
          height: "350px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
        }}
      >
        <Form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <h4 style={{margin: "20px 0"}}>Ulogirajte se kako bi nastavili...</h4>
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
        <Button color="success" onClick={()=>handleLogin()}>Login</Button>
        </Form>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Index;
