import React, { useContext } from 'react'
import './allStyle.css'
import { Link } from 'react-router-dom';
import navImg from '../logo/poll-logo-bg.png'
import banner from '../images/hero-voting-polls-women-mobile.png'
import { UserContext } from '../App';

const HomePage = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    console.log(loggedUser)

    return (
        <div>
            <header>
                <nav className="navbar navbar-light bg-light navigation">
                    {/* <!-- Navigation Bar --> */}
                    <div className="container-fluid gx-5 nav-div1">
                        <div className="nav-logo-title">
                            <Link to={"/home"} className="navbar-brand">
                                <img src={navImg} alt="" width="30" height="30" className="d-inline-block align-text-top" />
                                Polling Site for RUETians
                            </Link>
                        </div>


                        <div id="login-join" className="login-join-button row justify-content-between">
                            <div className="col-6">
                                {/* <!-- Login Button With Login Form Modal -->
                <!-- Button trigger modal --> */}
                                {loggedUser.useremail? <h5>{loggedUser.firstname} {loggedUser.lastname}</h5>:<Link to={"/login"}>
                                    <button type="button" className="btn btn-sm nav-btn login-btn login-btn1">
                                        Login
                                    </button>
                                </Link>}
                                {loggedUser.useremail && <Link to={"/polls"}>
                                    <button type="button" className="btn btn-sm nav-btn login-btn login-btn1">
                                        All Polls
                                    </button>
                                </Link>}
                            </div>
                            <div className="col-6">
                                {/* <!-- Join Button as anchor (sends to sign up page) --> */}
                                <Link to={"/signup"}>
                                    <button type="button" className="btn btn-sm btn-light nav-btn">Join</button>
                                </Link>
                            </div>
                        </div>

                        <div id="user-icon" className="" style={{marginRight: '50px', display: 'none'}}>
                            <a href=""><span style={{fontSize: '25px', color: '#0d1a47'}}><i
                                className="fas fa-user-circle"></i></span></a>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section className="container-fluid" style={{marginTop: '60px'}}>
                    <div className="row justify-content-around">
                        <div className="col-lg-4 col-12" style={{paddingTop: '60px', paddingLeft: '40px'}}>
                            {/* <!-- Text and create poll button section --> */}
                            <div>
                                <h1 style={{fontSize: '60px',fontWeight: '400', color: 'rgb(11, 11, 99)'}}>Launch online voting and polls</h1>
                                <br />
                                <h2>Voting and polling features to help you capture opinions and get your results in no time.</h2>
                            </div>
                            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                                <Link to={"/createPoll"}>
                                    <button type="button" className="btn create-poll-btn">Create a new poll</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            {/* <!-- image div section --> */}
                            <img className="mx-auto d-block img-fluid" src={banner} alt="" />
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <section className="container-fluid align-content-center">
                    <div className="logo-copyright container-fluid align-content-center">
                        <div>
                            <img className="mx-auto d-block img-fluid" src="logo/ruet-logo.png" alt="" width="7%" />
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
        </div>
    )
}

export default HomePage
