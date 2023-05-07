import { Button, Container, Row, Col, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './issuer.css';

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
        <Button style={buttonStyle}>{value}</Button>
    )
}

function Issuer() {
    return (

        <div className="Holderr">
            <header className="Holderr-header">

                <Container>

                    <Navbar className='navBarI'>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >Aadhar Issuing Authority</Nav.Link>
                                </Nav>
                                <Nav className="ml-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >Issuer</Nav.Link>
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