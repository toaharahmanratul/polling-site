import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import pollLogo from '../logo/poll-logo-bg.png'
import ruetLogo from '../logo/ruet-logo.png'
import swal from 'sweetalert';


const SignUpPage = () => {
    const [joinInfo, setJoinInfo] = useState({});
    

    const handleFieldInput = (e) => {
        setJoinInfo({ ...joinInfo, [e.target.name]: e.target.value });
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(joinInfo);

        fetch("http://localhost:8080/sign-up", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(joinInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    swal("Done!", "successfully Registered!", "success");
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
                    </div>
                </nav>
            </header>
            <main>
                <section className="container-fluid justify-content-center">
                    <div className="container-fluid justify-content-center" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
                        <h1 style={{ textAlign: 'center' }}>Create a FREE account</h1>
                        <a href="" className="d-block" style={{ color: 'rgb(28, 28, 160)', textAlign: 'center' }}>*Terms and
                            conditions</a> <br />
                        <hr style={{ width: '40%', margin: 'auto' }} />
                    </div>
                    {/* <!-- main form starts --> */}
                    <div className="form container-fluid justify-content-center" style={{ width: '40%', padding: '40px' }}>
                        {/* <!-- First name, last name  --> */}
                        <form onSubmit={handleSignUp}>
                            <div className="row g-3">
                                <div className="col">
                                    <input onChange={handleFieldInput} name="firstname" id="first-name" type="text" className="form-control" placeholder="First name" aria-label="First name" required />
                                </div>
                                <div className="col">
                                    <input onChange={handleFieldInput} name="lastname" id="last-name" type="text" className="form-control" placeholder="Last name" aria-label="Last name" required />
                                </div>
                            </div>
                            {/* <!-- email password --> */}
                            <div className="row my-1 g-3 align-items-center">
                                <div className="col-12">
                                    <input onChange={handleFieldInput} name="useremail" id="user-email" type="email" className="form-control" placeholder="Email" aria-label="Email address" required />
                                </div>
                                <div className="col-auto">
                                    <input onChange={handleFieldInput} name="userpassword" id="user-password" type="password" id="inputPassword6" className="form-control" placeholder="Password"
                                        aria-describedby="passwordHelpInline" required />

                                    <div id="error-password" >
                                        <h4 style={{ color: 'red' }}>Password must be 8-20 characters long</h4>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <span id="passwordHelpInline" className="form-text">
                                        Must be 8-20 characters long.
                                    </span>
                                </div>
                            </div>
                            {/* <!-- Roll No. --> */}
                            <div className="row my-3">
                                <div className="col-6">
                                    <input onChange={handleFieldInput} name="rollno" id="roll-no" type="number" className="form-control" placeholder="Roll No. (eg. 1703057)"
                                        aria-label="Roll Number" required />
                                </div>
                            </div>
                            <br />
                            {/* <!-- Form check and submit button  --> */}
                            <div className="col-12">
                                <div className="form-check">
                                    <input onChange={handleFieldInput} name="checkBox" className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                                    <label className="form-check-label" for="invalidCheck2">
                                        Agree to terms and conditions
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                {/* <!-- <a href="index.html"> --> */}
                                <button id="sign-up-btn" className="btn create-poll-btn" type="submit">Sign Up</button>
                                {/* <!-- </a> --> */}
                            </div>
                        </form>
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
        </div>
    )
}

export default SignUpPage;
