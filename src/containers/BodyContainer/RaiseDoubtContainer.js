import React, { Component } from 'react';
import axios from 'axios';
import './RaiseDoubtContainer.css';
import { message } from 'antd';
const URL = "https://ninjasproblemsolver.herokuapp.com";

class RaiseDoubtContainer extends Component {
    state = {
        title: "",
        description: "",
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }
    onDescriptionChange = (event) => {
        this.setState({ description: event.target.value });
    }
    submitDoubt = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const data = {
            title: this.state.title,
            description: this.state.description,
        }
        axios
            .post(URL + "/create-doubt", data,)
            .then((response) => {
                if (response.status === 201) {
                    ;
                    this.props.addNewDoubt(response.data.doubt);
                    message.success("Doubt Added");
                } else {
                    message.error("Oops! Doubt not added");
                }
            })
            .catch((error) => {
                message.error("Oops! Doubt not added");
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
                                    <h4 class=""><strong>Title </strong></h4>
                                    <input onChange={this.onTitleChange}
                                        value={this.state.title}
                                        type="text" required="" placeholder="Please input your Name" name="name" class="txt" />
                                    <h4 class=""><strong>Description </strong></h4>
                                    <textarea onChange={this.onDescriptionChange}
                                        value={this.state.description}
                                        placeholder="Your Message" name="mess" type="text" style={{ height: 150 }} class="txt_3"></textarea>
                                    <input onClick={this.submitDoubt}
                                        type="submit" value="submit" name="submit" class="txt2" style={{ background: "#2F154C" }} />

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