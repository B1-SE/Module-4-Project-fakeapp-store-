import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavigationBar() {
    const [expanded, setExpanded] = useState(false);

    return (
      <Navbar expanded={expanded} expand="lg" className="bg-body-tertiary w-100" fixed="top" onToggle={() => setExpanded(!expanded)}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">FakeStore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)}>Products</Nav.Link>
              <Nav.Link as={Link} to="/addproduct" onClick={() => setExpanded(false)}>Add Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavigationBar;