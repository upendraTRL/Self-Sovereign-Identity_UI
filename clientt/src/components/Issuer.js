import { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './issuer.css';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    //New card data fill API call
    // const enterNewCard = () => {
    //     Axios.post("http://localhost:3001/newcardenter", {
    //         cred: usernameReg,
    //         password: passwordReg,
    //         usertype: usertypeReg,
    //         displayname: displaynameReg,
    //     }).then((response) => {
    //         if (response.status == 200) {
    //             if (window.confirm("Saved!")) {
    //                 // window.location.href = "http://localhost:3000/"
    //             }
    //         }
    //         console.log(response);
    //     });

    // };


    const buttonStyle = {
        backgroundColor: '#087494',
        border: 'none',
        color: '#FFFFFF',
    };
    return (
        <Button
            // onClick={enterNewCard}
            style={buttonStyle}>{value}
        </Button>
    )
}

function Issuer() {

    //enter new card
    const [credDef, setCredDef] = useState("");
    const [schemaID, setSchemaID] = useState("");


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

    var schemaCheck = "abc"



    return (

        <div className="Holderr">
            <header className="Holderr-header">

                <Container>

                    <Navbar className='navBarI'>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{displayID}</Nav.Link>
                                </Nav>
                                <Nav className="ml-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{displayName}</Nav.Link>
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

                            </Row>

                            {/* Row2 */}
                            {schemaCheck && (<Row className='ncRow'>
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
                                        <HolderButton value="Create Invitation" />
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

                            </Row>)}


                        </Col>


                        {/* Column Right */}
                        <Col className='rightCol'>

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

                        </Col>

                    </Row>
                </Container>
            </header>
        </div>

    )
}

export default Issuer