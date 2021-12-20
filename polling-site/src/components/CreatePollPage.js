import React, { useContext, useEffect, useState } from 'react'

import ruetLogo from '../logo/ruet-logo.png'
import pollLogo from '../logo/poll-logo-bg.png'
import { UserContext } from '../App';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';


const CreatePollPage = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [createdPollInfo, setCreatedPollInfo] = useState({});
    const [inputList, setInputList] = useState([{
        option: '',
        count: 0
    },
    {
        option: '',
        count: 0
    },
    ])

    const [description, setDescription] = useState({ description: '' })



    const handleDescription = (e) => {
        const des = e.target.value;
        setDescription({ description: des })
    }

    const handleAddOptBtn = () => {

        setInputList([...inputList, { option: '', count: 0 }]);


        // console.log("hi", countAddOpt)
    }
    const handleDeleteOptBtn = (deleteOptNo) => {

        const list = [...inputList]
        list.splice(deleteOptNo, 1)
        setInputList(list);
        console.log("delete", deleteOptNo)
    }
    const handleOptionFieldInput = (e, i) => {

        const { value } = e.target;
        const list = [...inputList];

        list[i].option = value;

        setInputList(list);

        // console.log("hi", list[i], e.target.name, e.target.value, i)

    }

    const handleCreateBtn = () => {
        const pollInfo = {
            options: inputList,
            ...description,
            creatorName: loggedUser.firstname +" "+ loggedUser.lastname,
            creatorEmail: loggedUser.email,
        }
        fetch("http://localhost:8080/addPoll", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pollInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCreatedPollInfo(data);
                if (data.isDone) {
                    swal("Done!", "successfully created poll!", "success");
                }
            })
    }



    return (
        <div>
            <header>
                <nav className="navbar navbar-light bg-light navigation">
                    {/* <!-- Navigation Bar --> */}
                    <div className="container-fluid gx-5 nav-div1">
                        <div className="nav-logo-title">
                            <Link to={"/home"} className="navbar-brand">
                                <img src={pollLogo} alt="" width="30" height="30"
                                    className="d-inline-block align-text-top" />
                                Polling Site for RUETians
                            </Link>
                        </div>
                        <div className="" style={{ marginRight: '50px' }}>
                            {loggedUser.useremail ? <h5>{loggedUser.firstname} {loggedUser.lastname}</h5> 
                            : <a href=""><span style={{ fontSize: '25px', color: '#0d1a47' }}><i
                                className="fas fa-user-circle"></i></span></a>}
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section className="container-fluid justify-content-center align-items-center"
                    style={{ marginTop: '50px', marginBottom: '200px', paddingBottom: '50px' }}>
                    <div className="container-fluid justify-content-center" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
                        <h1 style={{ textAlign: 'center' }}>Create Your Poll</h1>
                        <h5 style={{ textAlign: 'center' }}>Once you finish creating the poll, send the link to your voters.</h5>
                        <br />
                        <hr style={{ width: '40%', margin: 'auto' }} />
                    </div>
                    {/* <!-- Question form  --> */}
                    <div className="qsn-from container-fluid justify-content-center align-items-center" style={{ width: '50%' }}>
                        {/* <!-- Question --> */}
                        <div className="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Question:</label>
                            <textarea onChange={handleDescription} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        {/* <!-- Add Button  --> */}
                        <button onClick={handleAddOptBtn} id="add-option-btn" type="button" className="btn btn-sm btn-light nav-btn"><span className="icons"><i
                            className="fas fa-plus"></i></span></button>
                        {/* <!-- Options div  --> */}
                        <div id="option-div" className="">
                            {/* <div id="option-div-1" className="input-group mb-3" style={{ marginTop: '10px' }}>
                                <input onChange={(e) => handleOptionFieldInput(e, 1)} name="option" type="text" className="form-control" placeholder="Option" aria-label="Recipient's username"
                                    aria-describedby="button-addon2" default="01" />
                                <button id="cancel-option-btn-1" className="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                    className="fas fa-times"></i></button>
                            </div>
                            <div id="option-div-2" className="input-group mb-3" style={{ marginTop: '10px' }}>
                                <input onChange={(e) => handleOptionFieldInput(e, 2)} name="option" type="text" className="form-control" placeholder="Option" aria-label="Recipient's username"
                                    aria-describedby="button-addon2" />
                                <button id="cancel-option-btn-2" className="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                    className="fas fa-times"></i></button>
                            </div> */}
                            {
                                inputList.map((value, i) =>
                                    <div key={i} id="option-div-2" className="input-group mb-3" style={{ marginTop: '10px' }}>
                                        <input onChange={(e) => handleOptionFieldInput(e, i)} name="option" type="text" className="form-control" placeholder="Option" aria-label="Recipient's username"
                                            aria-describedby="button-addon2" />
                                        <button onClick={() => handleDeleteOptBtn(i)} id="cancel-option-btn-2" className="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                            className="fas fa-times"></i></button>
                                    </div>
                                )


                            }
                        </div>
                        {/* <!-- Create Poll Button  --> */}
                        <div style={{ marginTop: '30px' }}>
                            {/* <a href="poll-successful.html"> */}
                                <button onClick={handleCreateBtn} type="button" className="btn create-poll-btn">Create poll</button>
                            {/* </a> */}
                        </div>
                        <div>
                            {
                              createdPollInfo.isDone && <Link to={`/poll/${createdPollInfo.pollId}`}>
                                    <h4>Poll link: {`/poll/${createdPollInfo.pollId}`}</h4>
                                </Link>
                            }
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <section className="container-fluid align-content-center">
                    <div className="logo-copyright container-fluid align-content-center">
                        <div>
                            <img className="mx-auto d-block img-fluid" src={ruetLogo} alt="" width="7%" />
                        </div>
                        <div>
                            <span className="icons">
                                <a target="_blank" href="https://fb.com/"> <i className="fab fa-facebook"></i> </a>
                                <a target="_blank" href="https://twitter.com/?lang=en"> <i className="fab fa-twitter"></i> </a>
                                <a target="_blank" href="https://www.instagram.com/"> <i className="fab fa-instagram"></i> </a>
                                <a target="_blank" href="https://www.youtube.com/"> <i className="fab fa-youtube"></i> </a>
                            </span>
                        </div>
                        <div>
                            <span>Copyright <i className="far fa-copyright"></i> 2022 Polling Site for RUETians</span>
                        </div>

                    </div>
                </section>

            </footer>
            {/* <pre>
                {
                    JSON.stringify(inputList, null, 2)
                }
            </pre> */}
        </div>
    )
}

export default CreatePollPage
