import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function Navigation(args) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsOpen(!isOpen);

  const navItemStyle = {
    cursor: "pointer",
  }

  return (
    <Navbar style={{ backgroundColor: "white", margin: "0px 0px 10px 0px", padding: 0, width: "100%" }}>
      <NavbarBrand href="/">
        <img
          src="https://www.mev.hr/wp-content/uploads/2022/02/logowhite.svg"
          alt="MEV_LOGO"
          style={{ width: "50px", height: "50px" }}
        />
        <div style={{display: "inline", marginLeft: "10px"}}>Složeni aplikacijski programi - Projekt: Radni nalozi</div>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem style={navItemStyle} onClick={()=>navigate("/radno-polje")}>
            <NavLink>
              Radno polje - Mape i radni nalozi
            </NavLink>
          </NavItem>
          <NavItem style={navItemStyle} onClick={()=>navigate("/korisnici/svi")}>
            <NavLink>Svi korisnici</NavLink>
          </NavItem>
          <NavItem style={navItemStyle}  onClick={()=>navigate("/korisnici/novi")}>
            <NavLink>Registriraj korisnika</NavLink>
          </NavItem>
          <NavItem style={navItemStyle}  onClick={()=>navigate("/korisnici/izbrisi")}>
            <NavLink>Izbriši korisnika</NavLink>
          </NavItem>
          <NavItem style={navItemStyle}>
            <NavLink>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
