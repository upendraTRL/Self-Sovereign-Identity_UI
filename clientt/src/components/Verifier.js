import { Button, Container, Row, Col, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './verifier.css';

function Verifier() {
    return (

        <div className="Holderr">
            <header className="Holderr-header">

                <Container>

                    <Navbar className='navBar'>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home" className='navText'>ACME</Nav.Link>
                                    <Nav.Link href="#link" className='navText'>Verifier</Nav.Link>
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
                                        <Button>Create Invitation</Button>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Connection name: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row>
                                    <Row className='leftBlock1'>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Invitation message: </Form.Label>
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
                                    <Button>Refresh</Button>
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
                                                <Form.Control type="text" placeholder="Enter name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Age: </Form.Label>
                                                <Form.Control type="number" placeholder="Enter age" />
                                            </Form.Group>
                                        </Form>
                                    </Col>


                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Gender: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter gender" />
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
                                                <Form.Control type="text" placeholder="Enter name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Age: </Form.Label>
                                                <Form.Control type="number" placeholder="Enter age" />
                                            </Form.Group>
                                        </Form>
                                    </Col>


                                    <Col>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Gender: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter gender" />
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