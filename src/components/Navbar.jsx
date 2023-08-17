// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// function AppNavBar() {
//     const [authenticated, setAuthenticated] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('authorization');
//         if (token) {
//             setAuthenticated(true); // Set authenticated to true if token exists
//         } else {
//             setAuthenticated(false);
//         }
//     }, []);

//     const handleLogout = () => {

//         localStorage.removeItem('authorization');
//         localStorage.removeItem('role');
//         setAuthenticated(false);
//         navigate('/login');
//         toast.success('Logout Success');
//     };

//     return (
//         <Navbar expand="lg" bg="dark" variant="dark">
//             <Container>
//                 <Navbar.Brand>BLOGSSS</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ms-auto bg-body-secondary">
//                         {authenticated && localStorage.getItem("role") === "admin" ? (

//                             <>
//                                 <Nav.Link as={NavLink} to="/create" className="nav-link bg-black">
//                                     Create
//                                 </Nav.Link>
//                                 <Nav.Link as={NavLink} to="/" className="nav-link bg-black">
//                                     List
//                                 </Nav.Link>
//                             </>
//                         ) : null}
//                         {authenticated ? (
//                             <Nav.Link onClick={handleLogout} className="nav-link bg-black">
//                                 Logout
//                             </Nav.Link>
//                         ) : null}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default AppNavBar;


