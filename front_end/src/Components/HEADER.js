import { useEffect, useState } from "react";
import { useContext } from "react";



// or less ideally
import { Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
export function Header(props){


useEffect(()=>{

      console.log(localStorage.getItem('token') === null);

     // if(localStorage.getItem('token') !== 'null') console.log(localStorage.getItem('token'))
},[])


return(

    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="home">Home</Nav.Link>
        
          <NavDropdown title="CRUD" id="basic-nav-dropdown">
            <NavDropdown.Item href="books">Books</NavDropdown.Item>
            <NavDropdown.Item href="users">Users</NavDropdown.Item>
            <NavDropdown.Item href="authors">Authors</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Authos</NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item href="#action/3.3">Book to author</NavDropdown.Item>

            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
{localStorage.getItem('token') !== null ? <Button onClick={()=>{
  
  localStorage.removeItem('token');
  

}} variant="outline-danger">Log out</Button>
: <Button href="login" variant="outline-success">Log in</Button> } 

  </Navbar>
    )

}