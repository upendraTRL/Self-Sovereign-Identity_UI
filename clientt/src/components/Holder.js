
import { Button, Container, Row, Col, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './holder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';


//Copy to clipboard
function CopyToClipboardButton({ text }) {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
    };
    return (
        <button><FontAwesomeIcon icon={faCopy} onClick={handleCopyClick} /></button>
    );
}

//Font Size
const sizeF = {
    fontSize: '24px'
};

//Name
function UserName({ name }) {
    return (
        <Nav.Link href="#home" className='navText' style={sizeF} >{name}</Nav.Link>
    )
}

//Button CSS
function HolderButton({ value }) {
    const buttonStyle = {
        backgroundColor: '#580494',
        border: 'none',
        color: '#FFFFFF',
    };
    return (
        <Button style={buttonStyle}>{value}</Button>
    )
}

//Collapse
// function PanelC({ title, children }) {
//     const [isActive, setIsActive] = useState(false);
//     return (
//         <div className='collapsePanel'>
//             <h3>{title}</h3>
//             {isActive ? (
//                 <p>{children}</p>
//             ) : (
//                 <button onClick={() => setIsActive(true)}>Show</button>
//             )}
//         </div>
//     )
// }

function Holder() {
    //Aadhar array
    const arrayTest = [
        { id: 0, name: 'User1', age: 20 },
        { id: 1, name: 'User2', age: 21 },
        { id: 2, name: 'User3', age: 35 }
    ]

    const [listOfUsers, setListOfUsers] = useState(arrayTest);


    //Collapse 2
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }

    //Main
    return (

        <div className="Holderr">

            {/* Nav Section */}
            <header className="Holderr-header">

                <Navbar className='navBarH'>
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <UserName name="Alice" />
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Link href="#home" className='navText' style={sizeF} >Holder</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </header >

            {/* Body section */}
            <div className='holderBody'>
                <Container>
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
                                    <Row className='leftBlock1'>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor' >Invitation message: </Form.Label>
                                                <div className='copy-text'>
                                                    <input type="text" class="text" value="Msg!" disabled />
                                                    <CopyToClipboardButton text="Hello" />
                                                </div>
                                                {/* <Form.Control className='' type="text" value="Value" disabled /> */}
                                            </Form.Group>
                                        </Form>

                                    </Row>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Holder/Issuer: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Holder name: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row className='mailtitle'>
                                    <Col>

                                    </Col>
                                    <Col>
                                        {/* <Button variant='info'>Refresh</Button> */}
                                        <HolderButton value="Refresh" />
                                    </Col>
                                </Row>

                            </Row>

                            {/* Row2 */}
                            <Row className='leftRow2'>
                                <Row className='mailtitle'>
                                    <Col>
                                        <h2>Presentation</h2>
                                    </Col>
                                    <Col>

                                    </Col>
                                </Row>



                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>To: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Credential: </Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row className='mailtitle'>
                                    <Col>

                                    </Col>
                                    <Col>
                                        <HolderButton value="Present Proof" />
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
                                <Col>
                                    <HolderButton value="Refresh" />
                                </Col>
                            </Row>

                            {/* Row2 */}
                            <Row>
                                <Row className='rightBlock1'>
                                    <Row className='title1'><h4>Aadhar</h4></Row>
                                    <Col>

                                        <div className='usersDisplay'>
                                            {listOfUsers.map((user) => {
                                                return (
                                                    <div>
                                                        <h4>Name: {user.name}</h4>
                                                        <h4>Age: {user.age}</h4>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Name: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Age: </Form.Label>
                                                <Form.Control type="number" placeholder="Enter age" />
                                            </Form.Group>
                                        </Form> */}
                                    </Col>


                                    <Col>

                                        <div className='collapseFeature'>
                                            <h4>Aadhar List</h4>
                                            <div className={selected === true ? "content show" : "content"}>Description</div>

                                            <div className="titleC" onClick={() => toggle(true)}>
                                                <span>{selected === true ? '-' : '+'}</span>
                                            </div>
                                        </div>

                                        {/* <div className='collapseFeature'>
                                            <h2>Collapse</h2>
                                            <PanelC title="About">
                                                Hello about!
                                            </PanelC>
                                            <PanelC title="Etymology">
                                                Description!
                                            </PanelC>

                                        </div> */}

                                        {/* <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Gender: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter gender" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Address: </Form.Label>
                                                <Form.Control type="text" placeholder="Enter Address" />
                                            </Form.Group>
                                        </Form> */}
                                    </Col>

                                </Row>
                            </Row>

                            {/* Row3 */}
                            <Row>
                                <Row className='rightBlock2'>
                                    <Row className='title1'><h4>Pan</h4></Row>
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
            </div>

        </div >



    );
}

export default Holder