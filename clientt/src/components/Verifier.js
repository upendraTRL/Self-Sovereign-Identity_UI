import { Button, Container, Row, Col, Form, Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './verifier.css';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    //Fetch ALL DATA, and setting to local storage
    const [displayId, setDisplayId] = useState();
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
                localStorage.setItem("idVerifier", response.data[0].id);
                localStorage.setItem("usernameVerifier", response.data[0].username);
                localStorage.setItem("displaynameVerifier", response.data[0].displayname);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    //sending username and fetching schema_id, try 2
    // const [schemaId, setSchemaId] = useState('');
    const [username, setUsername] = useState("");

    //Store username to local storage and display to Nav Bar
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const displaynameVerifier = localStorage.getItem("displaynameVerifier")


    //holder name field check
    const [holderName, setHolderName] = useState('');
    const [inviUrl, setInvitationUrl] = useState('');
    const [stringInviUrl, setStringInviUrl] = useState('');
    const handleCreateInvitation = () => {
        console.log("Inviiiii holderrrr = ", holderName);
        if (holderName.trim() === "") {
            alert('Enter Holder Name');
        } else {
            let id = parseInt(localStorage.getItem('idVerifier'), 10);
            const userPort = id + 9000
            // Create connection API
            // console.log('Create Invitation clicked with a value:', holderName);
            Axios.post("http://localhost:3001/connections/create", {
                // userPort: displayId + 9000,
                id: id,
                connection_name: holderName,
                userPort: userPort,
                username: username
            }).then(response => {
                console.log("Create Connection = ", response.data);
                setInvitationUrl(response.data.invitation);
                const stringInviUrl2 = JSON.stringify(response.data.invitation);
                setStringInviUrl(stringInviUrl2);
                console.log("Invi URl final = ", stringInviUrl2);
                localStorage.setItem('userPort', userPort);
                localStorage.setItem('inviUrlVerifier', stringInviUrl2);
                localStorage.setItem('connectionVerifier', response.data.connection_id);

                if (response.status == 200 || response.status == 201) {
                    if (window.confirm("Connection created!")) {

                    }
                }
            });

        }
    };


    //Refresh in verifier
    const sampleUsers = [{ attrs: { name: "", gender: "", dob: "", address: "" }, schema_id: "" }]
    var [listOfUsers, setListOfUsers] = useState(sampleUsers);
    const [verified, setVerified] = useState("");

    const handleGetCredentials = () => {
        let id = parseInt(localStorage.getItem('idVerifier'), 10);
        const userPort = id + 9000
        const username = localStorage.getItem('usernameVerifier');
        console.log("IDDDDDDDDDD - ", userPort);

        // Make API call to fetch user schema_id
        Axios.get('http://localhost:3001/present-proof/records', {
            params: {
                userPort: userPort,
                username: username
            }
        }).then(response => {
            setListOfUsers(response.data);
            console.log(response.data);
            // console.log(response[1].data);

            console.log(listOfUsers);
        }).catch(error => {
            console.log(error);
        });
    };


    //Main
    return (

        <div className="Holderr">
            <header className="Holderr-header">

                <Container>

                    {/* Nav bar */}
                    <Navbar className='navBarV'>
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{displayId}</Nav.Link>
                                </Nav>
                                <Nav className="ml-auto">
                                    {/* <Nav.Link href="#home" className='navText' style={sizeF} >University</Nav.Link> */}
                                    <Nav.Link href="#home" className='navText' style={sizeF} >{displaynameVerifier}</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                    <Row>

                        {/* Col Left */}
                        <Col className='colLeft'>

                            {/* Invitation card */}
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
                                        <Button
                                            style={{ background: "purple", color: "#FFFFFF", border: "none" }}
                                            onClick={handleCreateInvitation} >
                                            Create Invitation
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className='textColor'>Holder name: </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={holderName}
                                                onChange={(e) => {
                                                    setHolderName(e.target.value);
                                                }} />
                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row>
                                    <Row className='leftBlock1'>

                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className='textColor'>Invitation Link: </Form.Label>
                                                <div className='copy-text'>
                                                    <input type="text" class="text" value={stringInviUrl} disabled />
                                                    <CopyToClipboardButton text={stringInviUrl} />
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


                        </Col>


                        {/* Column Right */}
                        <Col className='rightCol'>

                            {/* Verification card */}
                            <Row className='mailtitle'>
                                <Col>
                                    <h2>Verifications</h2>
                                </Col>
                                <Col>
                                    <Button
                                        style={{ background: "#087494", color: "#FFFFFF", border: "none" }}
                                        onClick={handleGetCredentials} >
                                        Refresh
                                    </Button>
                                </Col>
                            </Row>

                            {/* Verification aadhar */}
                            <Row>
                                <Row className='rightBlock1'>

                                    <div className='usersDisplay'>

                                        {listOfUsers.map((user) => {


                                            let checkVerified = user.verified



                                            return (

                                                // User list
                                                <Row>
                                                    <Row className='title1'>
                                                        <Col>
                                                            {
                                                                (checkVerified == 'true') ?
                                                                    (<h4 className='verified'>Verified</h4>) :
                                                                    (<h4 className='verified'>Not Verified</h4>)
                                                            }

                                                        </Col>
                                                    </Row>

                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label className='textColor'>Name: </Form.Label>
                                                                <Form.Control type="text" value={user.connection_id} disabled />
                                                            </Form.Group>

                                                            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label className='textColor'>Date Of Birth: </Form.Label>
                                                                <Form.Control type="text" value={user.attrs.dob} disabled />
                                                            </Form.Group> */}
                                                        </Form>
                                                    </Col>


                                                    {/* <Col>


                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label className='textColor'>Gender: </Form.Label>
                                                                <Form.Control type="text" value={user.attrs.gender} disabled />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label className='textColor'>Address: </Form.Label>
                                                                <Form.Control type="text" value={user.attrs.address} disabled />
                                                            </Form.Group>
                                                        </Form>
                                                    </Col> */}
                                                    <hr style={{ background: "black", height: "3px" }} />
                                                </Row>
                                            );
                                        })}
                                    </div>

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