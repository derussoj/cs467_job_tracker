import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function NavBar({ currentUser, onLogout }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Job Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {currentUser ? (
                            <>
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as="button" onClick={onLogout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;