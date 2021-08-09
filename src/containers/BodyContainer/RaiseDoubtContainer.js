import React, { Component } from 'react';
import axios from 'axios';
import './RaiseDoubtContainer.css';
const URL = "http://localhost:8000";

class RaiseDoubtContainer extends Component {
    state = {
        title:"",
        description:"",
    }
    
    onTitleChange=(event)=>{
        this.setState({title:event.target.value});
    }
    onDescriptionChange=(event)=>{
        this.setState({description:event.target.value});
    }
    submitDoubt=()=>{
        console.log("proceed to submit doubt");
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const data = {
           title: this.state.title,
           description:this.state.description,
        }
        axios
           .post(URL + "/create-doubt", data,)
           .then((response) => {
              console.log(response);
              if (response.status === 200) {
              }
              // else message.error("Oops something is wrong! Contact dev team");
           })
           .catch((error) => {
              console.log("errot is " + error);
              // if (error.response && error.response.data.error)
              //     message.error(error.response.data.error);
              // else message.error("Something went wrong :(");
           });
    }

    render() {
        return (
            <div class="card postdoubt" >
              
                <div class="container">
                    <div class="row">
                        <div class="writingarea" >
                            <div class="form_main">
                                <h2 class="heading"><strong>Raise </strong> Doubt <span></span></h2>
                                <div class="form">
                                    {/* <form action="contact_send_mail.php" method="post" id="contactFrm" name="contactFrm"> */}
                                        <h4 class=""><strong>Title </strong></h4>
                                        <input  onChange={this.onTitleChange}
                                        value={this.state.title}
                                        type="text" required="" placeholder="Please input your Name"  name="name" class="txt" />
                                        <h4 class=""><strong>Description </strong></h4>
                                        <textarea onChange={this.onDescriptionChange}
                                        value={this.state.description}
                                        placeholder="Your Message" name="mess" type="text" style={{height:150}} class="txt_3"></textarea>
                                        <input onClick={this.submitDoubt}
                                        type="submit" value="submit" name="submit" class="txt2" style={{background:"#2F154C"}} />
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RaiseDoubtContainer;