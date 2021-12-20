import React, { useContext, useEffect,useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../App';
import pollLogo from '../logo/poll-logo-bg.png'
import ruetLogo from '../logo/ruet-logo.png'
import swal from 'sweetalert';

const LoginPage = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  
    const [serverUsers, setServerUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
       try{
        fetch("http://localhost:8080/allUsers")
        .then(res => res.json())
        .then(users => {
            console.log("hi",users);
            setServerUsers(users);
            
        })
    }
       catch(err){
           console.log(err)
       }
    },[])
   
    const handleOnChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(userInfo);
         const isUser = serverUsers.filter(su => su.useremail === userInfo.email && su.userpassword === userInfo.password)
         
         if(isUser.length>0){
            swal("Done!", "You are successfully logged in!", "success");
              history.replace(from);
              console.log("fasgvergvfae",isUser);

              setLoggedUser(isUser[0]);
         }
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-light bg-light navigation">
                    {/* <!-- Navigation Bar --> */}
                    <div className="container-fluid gx-5 nav-div1">
                        <div className="nav-logo-title">
                            <Link to={"/home"} className="navbar-brand">
                                <img src={pollLogo} alt="" width="30" height="30" className="d-inline-block align-text-top" />
                                Polling Site for RUETians
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container-fluid" style={{width: '40%', marginTop: '100px', marginBottom: '200px'}}>
                    <form onSubmit={handleLogin}>
                        <div className="modal-body">
                            {/* <!-- Login Form  --> */}
                            <div className="form-floating mb-3">
                                <input onChange={handleOnChange} name="email" id="login-email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                                <label  for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input onChange={handleOnChange} name="password" id="login-password" type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                                <label for="floatingPassword">Password</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button id="login-button" type="submit" className="btn btn-primary login-btn nav-btn">Login</button>
                        </div>
                    </form>
                </div>
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

export default LoginPage
