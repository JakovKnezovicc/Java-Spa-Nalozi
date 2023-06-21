import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter 
} from "reactstrap";
import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../components/AxiosConfig";
import {BiCheck} from "react-icons/bi";

const Edit = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [nalozi, setNalozi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nalog, setNalog] = useState({
    ime: null,
    korisnik: {
      id: null
    },
    mapa: {
      id: id
    },
  });
  const [nalogID, setNalogID] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(()=>{
    const handleNalozi = async()=>{
      try {
        console.log("PARAM ID: ", id);
        const {data} = await axios.get("http://localhost:8080/api/nalozi/mapa", {params: {mapaId: id}});
        console.log("nalozi: ", data);
        setNalozi(data);
      } catch (error) {
        if(error) throw error;
      }
    }

    const getKorisnikId = async() => {
      try {
        let ime = localStorage.getItem("username");
        ime = ime.replace(/^"(.*)"$/, '$1');
        const res = await axios.get(`http://localhost:8080/api/korisnici/${ime}`);
        console.log("api mape", res);
        setNalog({...nalog, korisnik: {
          id: res.data
        } })
        
      } catch (error) {
        if(error) throw error;
      }
    }

    getKorisnikId();

    handleNalozi();
  }, []);

  useEffect(()=>{
    if(nalozi.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [nalozi]);

  const sendNalog = async() => {
    try {
      const data = await axios.post("http://localhost:8080/api/nalozi/novi", nalog);
      console.log("res data", data);
    } catch (error) {
      if(error) throw error;
    }
  }

  const updateStatus = async() => {
    console.log("NALOG ID", nalogID);
    try {
      const data = await axios.put(`http://localhost:8080/api/nalozi/status/${nalogID}`);

    } catch (error) {
      if(error) throw error;
    }
  }

  const deleteNalog = () => {
    try {
      const data = axios.delete(`http://localhost:8080/api/nalozi/izbrisi/${nalogID}`);
    } catch (error) {
      if(error) throw error;
    }
  }

  const handleClick = (id) => {
    setNalogID(id);
    toggle();
  }

  return (
    <Container
      fluid
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "whitesmoke",
        margin: 0,
        padding: 0,
      }}
    >
      <Row>
        <Col>
          <Table responsive striped>
            <thead>
              <tr>
                <th>Korisnik</th>
                <th>Korisnicko ime</th>
                <th>Nalog</th>
                <th>Datum kreiranja</th>
                <th>Datum završetka</th>
                <th>Status</th>
                <th>Završi</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && nalozi.map((n)=>{return(
                <tr>
                <th scope="row">{n.korisnik.ime + " " + n.korisnik.prezime}</th>
                <td>{n.korisnik.korisnickoIme}</td>
                <td>{n.ime}</td>
                <td>{n.datumPocetka.slice(0,10)}</td>
                <td>{n.datumZavrsetka ? n.datumZavrsetka.slice(0,10): "U tijeku"}</td>
                <td>{n.status ? "Završen" : "U tijeku"}</td>
                <td style={{cursor: "pointer", backgroundColor: "whitesmoke"}} onClick={()=> handleClick(n.id)}><BiCheck style={{color: "green", fontSize: "1.5rem"}}/></td>
              </tr>
              )})}
            </tbody>
          </Table>
        </Col>
        <Col>
          <Form>
            <FormGroup>
              <Label>Naziv naloga</Label>
              <Input placeholder="Unesi..." type="text" value={nalog.ime} onChange={(e)=>setNalog((prevState)=>({...prevState, ime: e.target.value}))}/>
            </FormGroup>
            <FormGroup>
              <Label>Osoba</Label>
              <Input placeholder="Unesi..." type="text" />
            </FormGroup>
            <Button color="primary" style={{ width: "100%" }} onClick={()=>sendNalog()}>
              Spremi
            </Button>
          </Form>
        </Col>
      </Row>

      {/*Modalni prozor*/}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Pritiskom na gumb "Završi" radni nalog će biti završen.
          Pritiskom na gumb "Izbriši" radni nalog će biti izbrisan.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>{toggle(); updateStatus();}}>
            Završi
          </Button>{' '}
          <Button color="danger" onClick={() => {toggle(); deleteNalog();}}>
            Izbriši
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Edit;
