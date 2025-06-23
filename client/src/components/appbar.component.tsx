import { useState } from "react"
import AuthService from "../services/auth.service"
import { Link,  } from "react-router-dom"
import { Container, Navbar } from "react-bootstrap"
export const Appbar = () => {

    const [user,] = useState(AuthService.getCurrentUser())


    return (
        <Navbar expand="lg" className="bg-body-secondary mb-3 justify-content-between">
            <Container>
                <Navbar.Brand href="#home">MyBooks</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {user ? <Navbar.Text>Welcome {user.username}</Navbar.Text>
                    : ""}
                {user ?<Navbar.Text><Link to="/" onClick={AuthService.logout}>logout</Link>
                </Navbar.Text>:""}
        
      </Container >
     </Navbar>

);

}

