import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { message } from 'antd';

const URL = "https://ninjasproblemsolver.herokuapp.com";

class LoginForm extends Component {
   state = {
      email: "",
      password: "",
      userType: "",
   }
   proceedToSignIn = async (e) => {

      const data = {
         email: this.state.email,
         password: this.state.password,
         userType: this.state.userType,
      }
      axios
         .post(URL + "/create-session", data)
         .then((response) => {
            if (response.status === 200) {
               localStorage.setItem('token', `Bearer ${response.data.data.token}`);
               localStorage.setItem('userType', response.data.user.userType);
               axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
               axios.defaults.headers.common['Content-Type'] = 'application/json';
               message.success('Login Successful');
               this.props.afterSuccessfulLogin(response.data.user);
            }
            else{
               message.error('Invalid Credential');
            } 
         })
         .catch((error) => {
            message.error("Something went wrong");
         });
   }
   dropDownHandler=(event)=>{
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
         <div class="logindiv" hidden={!this.props.showLoginForm}>
            <h4>Signin at CodingNinjas</h4>
            <select onChange={this.dropDownHandler} class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
               <option selected>Choose User Type</option>
               <option value="student">Student</option>
               <option value="ta">Teachin Assistant</option>
               <option value="teacher">Teacher</option>
            </select>
            <div class="login-form">
               <div class="form-group">
                  <label>User Name</label>
                  <input
                     onChange={this.emailHandler}
                     value={this.state.email}
                     type="text" style={{ width: "70%" }} class="form-control" placeholder="User Name" />
               </div>
               <div class="form-group">
                  <label>Password</label>
                  <input
                     onChange={this.passwordHandler}
                     value={this.state.password}
                     type="password" style={{ width: "70%" }} class="form-control" placeholder="Password" />
               </div>
               <button
                  onClick={this.proceedToSignIn}
                  type="input" class="btn btn-success">Login</button>
            </div>
         </div>

      );
   }
}

export default LoginForm;