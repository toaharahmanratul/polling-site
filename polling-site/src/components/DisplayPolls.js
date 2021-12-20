import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import EachPoll from './EachPoll';
import pollLogo from '../logo/poll-logo-bg.png'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

const DisplayPolls = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const [pollInfo, setPollInfo] = useState([]);
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        fetch("http://localhost:8080/allPolls")
            .then(res => res.json())
            .then(polls => {
                console.log(polls);
                
                const poll = polls.filter(poll => poll._id === id);
                console.log(poll)
                setPollInfo(poll);
            })
    }, [])
    return (
        <div >
            <header>
                <nav className="navbar navbar-light bg-light navigation">
                    {/* <!-- Navigation Bar --> */}
                    <div className="container-fluid gx-5 nav-div1">
                        <div className="nav-logo-title">
                            <Link to="/" className="navbar-brand">
                                <img src={pollLogo} alt="" width="30" height="30"
                                    className="d-inline-block align-text-top" />
                                Polling Site for RUETians
                            </Link>
                        </div>
                        <div className="" style={{ marginRight: '50px' }}>
                            <a href=""><span style={{ fontSize: '25px', color: "#0d1a47" }}><i
                                className="fas fa-user-circle"></i></span></a>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container-fluid justify-content-center align-items-center">
            <div>
            {
                pollInfo.map(poll => <EachPoll key={poll._id} id={poll._id} poll={poll}></EachPoll>)
            }
            </div>
            </main>
           
        </div>
    )
}

export default DisplayPolls
