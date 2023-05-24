import { Button, Container, Row, Col, Form, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './verifier.css';
import { useState, useEffect } from 'react';
import Axios from "axios";

const sizeF = {
    fontSize: '24px'
};

function HolderButton({ value }) {
    const buttonStyle = {
        backgroundColor: 'purple',
        border: 'none',
        color: '#FFFFFF',
    };
    return (
        <Button style={buttonStyle}>{value}</Button>
    )
}

function Verifier() {

    //sending username and fetching schema_id, try 2
    // const [schemaId, setSchemaId] = useState('');
    const [displayId, setDisplayId] = useState();
    const [username, setUsername] = useState("");

    //Store username to local storage and display to Nav Bar
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        // Fetch username from localStorage
        const username = localStorage.getItem('username');

        // Make API call to fetch user schema_id
        Axios.get('http://localhost:3001/users', {
            params: {
                username: username
            }
        })
            .then(response => {
                console.log(response.data[0].schema_id);
                // setSchemaId(response.data[0].schema_id);
                setDisplayId(response.data[0].id);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    //Main
    return (

        <div className="Holderr">
            <header className="Holderr-header">

                <Container>

                    <Navbar className='navBarV'>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{displayId}</Nav.Link>
                                </Nav>
                                <Nav className="ml-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{username}</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                    <Row>

                        {/* Col Left */}
                        <Col className='colLeft'>

                            {/* Row1 */}
                            <Row className='leftRow1'>
                                <Row className='mailtitle'>
                                    <Col>
                                        <h2>Invitation</h2>
                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>

                                {/* Row2 */}

                                <Row>
                                    <Col className='inviBtn'>
                                        <HolderButton value="Create Invitation" />
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Holder name: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row>
                                    <Row className='leftBlock1'>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Invitation Link: </Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Form>

                                    </Row>
                                </Row>



                                <Row className='mailtitle'>
                                    <Col>

                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>

                            </Row>


                        </Col>


                        {/* Column Right */}
                        <Col className='rightCol'>

                            {/* Row1 */}
                            <Row className='mailtitle'>
                                <Col>
                                    <h2>Verifications</h2>
                                </Col>
                                <Col>
                                    <HolderButton value="Refresh" />
                                </Col>
                            </Row>

                            {/* Row2 */}
                            <Row>
                                <Row className='rightBlock1'>
                                    <Row className='title1'>
                                        <Col>
                                            <h4>Aadhar</h4>
                                        </Col>
                                        <Col>
                                            <h4 className='verified'>Verified</h4>
                                        </Col>

                                    </Row>
                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Name: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Age: </Form.Label>
                                                <Form.Control type="number" placeholder="Enter Age" />
                                            </Form.Group>
                                        </Form>
                                    </Col>


                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Gender: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Gender" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Address: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Address" />
                                            </Form.Group>
                                        </Form>
                                    </Col>

                                </Row>
                            </Row>

                            {/* Row3 */}
                            <Row>
                                <Row className='rightBlock2'>
                                    <Row className='title1'>

                                        <Col>
                                            <h4>Pan</h4>
                                        </Col>
                                        <Col>
                                            <Col>
                                                <h4 className='verified'>Verified</h4>
                                            </Col>
                                        </Col>

                                    </Row>
                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Name: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Age: </Form.Label>
                                                <Form.Control type="number" placeholder="Enter Age" />
                                            </Form.Group>
                                        </Form>
                                    </Col>


                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Gender: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Gender" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Address: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Address" />
                                            </Form.Group>
                                        </Form>
                                    </Col>

                                </Row>
                            </Row>

                        </Col>

                    </Row>
                </Container>
            </header>
        </div>

    )
}

export default Verifier