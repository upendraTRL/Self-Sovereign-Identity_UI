// Tasks:
// 1. fetch schema_id from DB and store in schemaCheck

import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './issuer.css';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from "axios";

//Copy to clipboard
function CopyToClipboardButton({ text }) {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
    };
    return (
        <button><FontAwesomeIcon icon={faCopy} onClick={handleCopyClick} /></button>
    );
}

const sizeF = {
    fontSize: '24px'
};

function HolderButton({ value }) {

    const buttonStyle = {
        backgroundColor: '#087494',
        border: 'none',
        color: '#FFFFFF',
    };
    return (
        <Button
            style={buttonStyle}>{value}
        </Button>
    )
}

function Issuer() {

    //New card data fill API call
    const [credDef, setCredDef] = useState("");
    const [schemaID, setSchemaID] = useState("");
    const [username, setUsername] = useState("");

    //Store username to local storage and display to Nav Bar
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    Axios.defaults.withCredentials = true;

    //Calling API to store newcard data
    const newcard = () => {
        Axios.post("http://localhost:3001/newcard", {
            schema_id: schemaID,
            cred_def_id: credDef,
            username: username,
        }).then((response) => {
            if (response.status == 200) {
                if (window.confirm("Successfully entered!")) {
                    // window.location.href = "http://localhost:3000/"
                }
            }
            console.log("New card = ", response);
        });

    };





    //fetch id,username,schema_id from users table
    // const [connection, setConnection] = useState();
    const [displayID, setDisplayID] = useState();
    const [displayName, setDisplayName] = useState();

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setDisplayID(data[0].id)
                setDisplayName(data[0].username)
                console.log("Issuer schema_id ", data[0].id, ", ", data[0].username, ", ", data[0].schema_id)
            })
            .catch(err => console.log(err));
    }, []);




    //sending username and fetching schema_id, try 2
    const [schemaId, setSchemaId] = useState('');

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
                setSchemaId(response.data[0].schema_id);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    var schemaCheck = schemaId;

    return (

        <div className="Holderr">
            <header className="Holderr-header">

                <Container>

                    {/* Navbar */}
                    <Navbar className='navBarI'>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{schemaId}</Nav.Link>
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

                            {/* Invitation card */}
                            {(schemaCheck == '0') ? null : (<Row className='leftRow1'>
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
                                                <div className='copy-text'>
                                                    <input type="text" class="text" value="Msg!" disabled />
                                                    <CopyToClipboardButton text="Hello" />
                                                </div>
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

                            </Row>)}

                            {/* New card */}
                            {(schemaCheck == '0') ? (<Row className='ncRow' disabled={schemaCheck !== '0'}>
                                <Row className='mailtitle'>
                                    <Col>
                                        <h2>New Card</h2>
                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>

                                {/* Row2 */}

                                <Row>
                                    <Col className='inviBtn'>
                                        <button onClick={newcard}> Create Invitation </button>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Schema ID: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => {
                                                    setSchemaID(e.target.value);
                                                }} />
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row>
                                    <Row className='leftBlock1'>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Cred-def-ID: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setCredDef(e.target.value);
                                                    }}
                                                />
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

                            </Row>) : null}


                        </Col>


                        {/* Credentials card */}
                        {(schemaCheck == '0') ? null : (<Col className='rightCol'>

                            {/* Row1 */}
                            <Row className='mailtitle'>
                                <Col>
                                    <h2>Credentials</h2>
                                </Col>

                            </Row>

                            {/* Row2 */}
                            <Row>
                                <Row className='rightBlock1'>

                                    <Col>
                                        <HolderButton value="Send Credentials" />
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>To Holder: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                </Row>
                            </Row>

                            {/* Row3 */}
                            <Row>
                                <Row className='rightBlock2'>
                                    <Row className='title1'><h4>Attributes</h4></Row>
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

                        </Col>)}

                    </Row>
                </Container>
            </header>
        </div>

    )
}

export default Issuer