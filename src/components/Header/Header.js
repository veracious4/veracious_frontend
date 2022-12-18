import React from 'react';
import { Nav, NavItem, Navbar, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap'
import {} from 'react-icons/fa';
import Logo from "../../assets/images/Veracious_Logo.png"
import './Header.css'


class Header extends React.Component{

  constructor(props) {
    super(props);
    
  }

  render() { 
      return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav_bar_section">
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand className="navbar__brand">
            <img src={Logo} height="70" width="70" alt="Veracious" /> Veracious  
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavItem>
                <Link to="/fact-validator" className="nav-link" >
                  <span className="NavBarLink fa fa-home fa-lg" /> Validator
                </Link>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <Link to="/login" className="nav-link" >
                  <span className="NavBarLink fa fa-home fa-lg" /> Login
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/signup" className="nav-link" >
                  <span className="NavBarLink fa fa-home fa-lg" /> Signup
                </Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
      );
  };
}

export default Header;