import React from 'react';
import Auxx from '../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';
import LoginForm from '../Login/LoginForm';
import SignupForm from '../SignUp/SignupForm';
import axios from 'axios';
import './NavBar.css';
import { message } from 'antd';
const URL = "https://ninjasproblemsolver.herokuapp.com";

const navbar = (props) => {

    function logoutButtonClicked() {
        localStorage.setItem('token', '');
        localStorage.setItem('userType', '');

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .post(URL + "/destroy-session")
            .then((response) => {
                axios.defaults.headers.common['Authorization'] = null;
                if (response.status === 200) {
                    message.success("Logout Successful");
                }
            })
            .catch((error) => {
            });

        props.logoutButtonHandler()
    }

    const resolveDoubtButton = props.welcomeName === "ta" ? <li class="nav-item">
        <a class="nav-link" href="#" onClick={props.showTaDoubts}>Solve Doubts</a>
    </li> : null;
    const solvinDoubtButton = props.welcomeName === "ta" ? <li class="nav-item">
        <a class="nav-link" href="#" onClick={props.solvingDoubt}>Solving Doubts</a>
    </li> : null;

    const sideElem = !props.welcomeName ?
        <div>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={props.loginButtonHandler}>Login</button>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={props.signUpButtonHandler}>Sign Up</button>
        </div> :
        <div>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button">Hi! {props.welcomeName}</button>
            <button onClick={logoutButtonClicked}
                class="btn btn-outline-success my-2 my-sm-0" type="button">Sign Out</button>
        </div>

    return (
        <Auxx>
            <Backdrop show={props.showBackdrop} backDropClickHandler={props.backDropClickHandler} />
            <LoginForm showLoginForm={props.showLoginForm} afterSuccessfulLogin={props.afterSuccessfulLogin} />
            <SignupForm showSignUpForm={props.showSignUpForm} afterSuccessfulLogin={props.afterSuccessfulLogin} />
            <nav class="navbar navbar-expand-sm  header">
                <img src="https://files.codingninjas.in/new-logo-03-11984.svg" id="logo" />

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                        <li class="nav-item active">
                            <a class="nav-link" href="#" onClick={props.homeButtonClickedHandler}>Home</a>
                        </li>
                        <li class="nav-item" hidden={props.welcomeName !== 'student'} onClick={props.raiseDoubt}>
                            <a class="nav-link" href="#">Raise Doubts</a>
                        </li>
                        {resolveDoubtButton}
                        {solvinDoubtButton}
                        <li class="nav-item" hidden={props.welcomeName !== 'teacher'} onClick={props.openDashboard}>
                            <a class="nav-link" href="#">Dashboard</a>
                        </li>

                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input hidden class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        {sideElem}
                    </form>
                </div>
            </nav>

        </Auxx>


    );
}

export default navbar;