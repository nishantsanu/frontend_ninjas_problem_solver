import React, { Component } from 'react';
import axios from 'axios';
import './SignupForm.css';
import { message } from 'antd';
const URL = "https://ninjasproblemsolver.herokuapp.com";

class SignupForm extends Component {
    state = {
        email: "",
        password: "",
        userType: "",
    }
    proceedToSignUp = async (e) => {

        const data = {
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType
        }
        axios
            .post(URL + "/create-user", {
                email: this.state.email,
                password: this.state.password,
                userType: this.state.userType
            }, { withCredentials: true })
            .then((response) => {
                if (response.status === 201) {
                    message.success('Sign Up Successful');
                    localStorage.setItem('token', `Bearer ${response.data.data.token}`);
                    localStorage.setItem('userType', response.data.user.userType);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
                    axios.defaults.headers.common['Content-Type'] = 'application/json';

                    this.props.afterSuccessfulLogin(response.data.user);
                }
            })
            .catch((error) => {
                message.error('Failed to sign up');
            });
    }
    dropDownHandler = (event) => {
        this.setState({ userType: event.target.value });
    }
    emailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    passwordHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div class="signupdiv" hidden={!this.props.showSignUpForm}>
                <h4>Signup at CodingNinjas</h4>
                <div class="login-form">
                    <select onChange={this.dropDownHandler} class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                        <option selected>Choose User Type</option>
                        <option value="student">Student</option>
                        <option value="ta">Teachin Assistant</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <div class="form-group">
                        <label>Email</label>
                        <input value={this.state.email}
                            onChange={this.emailHandler}
                            type="text" style={{ width: "70%" }} class="form-control" placeholder="User Name" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input value={this.state.password}
                            onChange={this.passwordHandler}
                            type="password" style={{ width: "70%" }} class="form-control" placeholder="Password" />
                    </div>
                    <button type="input" class="btn btn-success" onClick={this.proceedToSignUp} >Sign Up</button>
                
                </div>
            </div>

        );
    }
}

export default SignupForm;

