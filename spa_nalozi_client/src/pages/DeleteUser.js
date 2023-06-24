import { useEffect, useState } from "react";
import { Container, Row, Button, Table } from "reactstrap";
import { AiFillDelete } from "react-icons/ai";
import Navigation from "../components/Navigation";
import axios from "../components/AxiosConfig";

const DeleteUser = () => {
  const [korisnici, setKorisnici] = useState([]);
  const [isLoading, setIsLoading]= useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/korisnici/svi");
        console.log("Korisnici-res: ", res)
        setKorisnici(res.data);
      } catch (err) {
        if (err) throw err;
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteUser = async (id) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/korisnici/izbrisi/${id}`);
        console.log("Izbrisan korisnik, ", id);

    } catch (error) {
        if(error) throw error;
    }
  };

  useEffect(()=>{
    korisnici.length >= 1 ? setIsLoading(false) : setIsLoading(true);
  }, [korisnici]);
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
          <h1 style={{ textAlign: "center" }}>Izbriši korisnika</h1>
          <Table responsive striped>
            <thead>
              <tr>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Korisnicko ime</th>
                <th>Izbriši</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                korisnici.map((n) => {
                  return (
                    <tr>
                      <td>{n.ime}</td>
                      <td>{n.prezime}</td>
                      <td>{n.korisnickoIme}</td>
                      <td
                        style={{
                          cursor: "pointer",
                          backgroundColor: "whitesmoke",
                        }}
                      >
                        <AiFillDelete
                          style={{ color: "red", fontSize: "1.5rem" }} onClick={()=>handleDeleteUser(n.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
};

export default DeleteUser;
