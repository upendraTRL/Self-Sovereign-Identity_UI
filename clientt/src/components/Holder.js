
import { Button, Container, Row, Col, Form, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './holder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
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



function Holder() {
    //Calling get creds API
    useEffect(() => {

        let id = parseInt(localStorage.getItem('id'), 10);
        const userPort = id + 9000
        const username = localStorage.getItem('username');
        console.log("IDDDDDDDDDD - ", userPort);

        // Make API call to fetch user schema_id
        Axios.get('http://localhost:3001/issue-credential/get-credentials', {
            params: {
                userPort: userPort,
                username: username
            }
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);



    //Verifier enable and disable
    const [enableText, setEnableText] = useState(false);

    const handleRadioChange = (event) => {
        if (event.target.value === 'verifier') {
            setEnableText(true);
        } else {
            setEnableText(false);
        }
    };

    //Aadhar array
    const firstUser = {
        id: 0, name: 'Ram', age: 20
    }

    // Presentation card dropdowns
    // To Presentation dropdown
    const [selectedOption, setSelectedOption] = useState('');
    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
    };

    //To holder fetch data from connection table
    const [connectionName, setConnectionName] = useState([]);
    useEffect(() => {

        const username = localStorage.getItem('username');

        // Make API call to fetch user schema_id
        Axios.get('http://localhost:3001/toholder', {
            params: {
                username: username
            }
        })
            .then(response => {
                console.log(response.data);
                setConnectionName(response.data);
                console.log("Conn", connectionName);
                // setSchemaId(response.data[0].schema_id);
                // setDisplayId(response.data[0].id);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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


    //holder name field check
    const [holderName, setHolderName] = useState('');
    const [verifierName, setVerfierName] = useState('');
    // const [inviUrl, setInvitationUrl] = useState('');
    const [stringInviUrl, setStringInviUrl] = useState('');
    const handleCreateInvitation = () => {
        console.log("Inviiiii holderrrr = ", holderName);
        if (holderName.trim() === "") {
            alert('Enter Invitation Message');
        } else {
            const username = localStorage.getItem('username');
            alert('Entered');
            // Create connection API
            // console.log('Create Invitation clicked with a value:', holderName);
            let data = {
                id: displayId,
                url: holderName,
                verifierName: verifierName,
                username: username
            }
            Axios.post("http://localhost:3001/connections/receive",
                // userPort: displayId + 9000
                data

            ).then(response => {
                console.log("Holder invitation = ", response.data);

                if (response.status == 200 || response.status == 201) {
                    if (window.confirm("Connection created!")) {

                    }
                }
            });
        }
    };

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
                                <Nav.Link href="#home" className='navText' style={sizeF} >{displayId}</Nav.Link>
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Link href="#home" className='navText' style={sizeF} >Student</Nav.Link>
                                {/* <Nav.Link href="#home" className='navText' style={sizeF} >{username}</Nav.Link> */}
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
                                        <h2>Accept Invitation</h2>
                                    </Col>

                                </Row>

                                {/* Row2 */}
                                <Row>
                                    <Row className='leftBlock1'>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor' >Invitation message: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={holderName}
                                                    onChange={(e) => {
                                                        setHolderName(e.target.value);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Form>

                                    </Row>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Type of User: </Form.Label>
                                            <Form>
                                                <Form.Check
                                                    type="radio"
                                                    id="radio-button-1"
                                                    label="Verifier"
                                                    name="radioButtons"
                                                    value="verifier"
                                                    onChange={handleRadioChange}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    id="radio-button-2"
                                                    label="Issuer"
                                                    name="radioButtons"
                                                    value="option2"
                                                    onChange={handleRadioChange}
                                                />

                                            </Form>
                                        </Form.Group>

                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Verifier name: </Form.Label>
                                            {enableText && (
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) => {
                                                        setVerfierName(e.target.value);
                                                    }}
                                                />
                                            )}
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row className='mailtitle'>
                                    <Col>

                                    </Col>
                                    <Col>
                                        {/* <Button variant='info'>Refresh</Button> */}
                                        <Button
                                            style={{ background: "#087494", color: "#FFFFFF", border: "none" }}
                                            onClick={handleCreateInvitation} >
                                            Accept Invitation
                                        </Button>
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

                                            <Form>
                                                <DropdownButton
                                                    id="dropdown-button"
                                                    title={selectedOption || 'Select an option'}
                                                    onSelect={handleDropdownSelect}
                                                // style={dropdownButtonStyle}
                                                >
                                                    {connectionName.map((item, index) => (
                                                        <Dropdown.Item
                                                            key={index} eventKey={item.connection_name}
                                                        >
                                                            {item.connection_name}
                                                        </Dropdown.Item>
                                                    ))}
                                                </DropdownButton>
                                                {/* <Form.Control type="text" disabled={!selectedOption} style={{ backgroundColor: 'white' }} /> */}
                                            </Form>
                                        </Form.Group>

                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Credential: </Form.Label>
                                            <Form>
                                                <DropdownButton
                                                    id="dropdown-button"
                                                    title={selectedOption || 'Select an option'}
                                                    onSelect={handleDropdownSelect}
                                                    style={{ color: 'white' }}
                                                >
                                                    <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
                                                    <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
                                                    <Dropdown.Item eventKey="option3">Option 3</Dropdown.Item>
                                                </DropdownButton>

                                            </Form>
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

                                    {/* 0th Index User */}
                                    <Row>
                                        {/* Name & Age */}
                                        <Col>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className='textColor'>Name: </Form.Label>
                                                    <Form.Control type="text" value={firstUser.name} disabled />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className='textColor'>Age: </Form.Label>
                                                    <Form.Control type="number" value={firstUser.age} disabled />
                                                </Form.Group>
                                            </Form>
                                        </Col>

                                        {/* Gender & address */}
                                        <Col>
                                            {/* //Collapse use1 */}

                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className='textColor'>Gender: </Form.Label>
                                                    <Form.Control type="text" value="Male" disabled />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className='textColor'>Address: </Form.Label>
                                                    <Form.Control type="text" value="Pune" disabled />
                                                </Form.Group>
                                            </Form>
                                        </Col>

                                    </Row>


                                    {/* Clp star */}



                                    {/* Clp end */}

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
            </div>

        </div >



    );
}

export default Holder







// Collapse use1
{/* <div className='collapseFeature'>
    <h4>Aadhar List</h4>
    <div className={selected === true ? "content show" : "content"}>Description</div>

    <div className="titleC" onClick={() => toggle(true)}>
    <span>{selected === true ? 'Show Less' : 'Show More'}</span>
    </div>
    </div> */}

{/* <div className='collapseFeature'>
<h2>Collapse</h2>
<PanelC title="About">
Hello about!
</PanelC>
<PanelC title="Etymology">
Description!
</PanelC>
</div> */}
