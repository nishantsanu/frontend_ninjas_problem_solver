import React, { Component } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { message } from 'antd';

const URL = "http://localhost:8000";

class LoginForm extends Component {
   state = {
      email: "",
      password: "",
      userType: "",
   }
   proceedToSignIn = async (e) => {

      console.log("proceed to signin");
      const data = {
         email: this.state.email,
         password: this.state.password,
         userType: this.state.userType,
      }
      console.log(data);
      axios
         .post(URL + "/create-session", data)
         .then((response) => {
            console.log(response);
            if (response.status === 200) {
               localStorage.setItem('token', `Bearer ${response.data.data.token}`);
               localStorage.setItem('userType', response.data.user.userType);
               // document.cookie = `Bearer ${response.data.data.token}`;
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
            if (error.response && error.response.data.error)
               console.log(error.response.data.error);
            else console.log("Something went wrong :(");

            message.error("Something went wrong");
         });
   }
   dropDownHandler=(event)=>{
      console.log(event.target.value);
      this.setState({ userType: event.target.value });
   }
   // userTypeHandler = (event) => {
   //    this.setState({ userType: event.target.value });
   // }
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
            {/* <div class="form-group">
               <label>User Type</label>
               <input value={this.state.userType} onChange={this.userTypeHandler}
                  type="text" style={{ width: "70%" }} class="form-control" placeholder="ta/student/teacher" />
            </div> */}
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

               {/* </div> */}
            </div>
         </div>

      );
   }
}

export default LoginForm;