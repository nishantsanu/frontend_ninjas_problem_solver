import React, { Component } from 'react';
import axios from 'axios';
import './SignupForm.css';
import { message } from 'antd';
const URL = "http://localhost:8000";

class SignupForm extends Component {
    state = {
        email: "",
        password: "",
        userType: "",
    }
    proceedToSignUp = async (e) => {

        console.log("proceed to signup");
        const data = {
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType
        }
        console.log(data);
        axios
            .post(URL + "/create-user", {
                email: this.state.email,
                password: this.state.password,
                userType: this.state.userType
            }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log("message");
                    message.success("Sign Up Successful");
                }
                // else message.error("Oops something is wrong! Contact dev team");
            })
            .catch((error) => {
                console.log("errot is " + error);
                if (error.response && error.response.data.error)
                    message.error(error.response.data.error);
                else message.error("Something went wrong :(");
            });
    }
    dropDownHandler=(event)=>{
        console.log(event.target.value);
        this.setState({ userType: event.target.value });
     }
    // userTypeHandler = (event) => {
    //     this.setState({ userType: event.target.value });
    // }
    emailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    passwordHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div class="signupdiv" hidden={!this.props.showSignUpForm}>
                {/* <div class="col-md-6 col-sm-12"> */}
                <h4>Signup at CodingNinjas</h4>
                <div class="login-form">
                    <select onChange={this.dropDownHandler} class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                        <option selected>Choose User Type</option>
                        <option value="student">Student</option>
                        <option value="ta">Teachin Assistant</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    {/* <div class="form-group">
                        <label>User Type</label>
                        <input value={this.state.userType} onChange={this.userTypeHandler}
                            type="text" style={{ width: "70%" }} class="form-control" placeholder="ta/student/teacher" />
                    </div> */}
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
                    {/* </form> */}
                    {/* </div> */}
                </div>
            </div>

        );
    }
}

export default SignupForm;

