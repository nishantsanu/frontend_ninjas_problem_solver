
import React, { Component } from 'react';
import axios from 'axios';
import './TeacherDashboard.css';
const URL = "http://localhost:8000/";

class TeacherDashboard extends Component {
    state = {
        taList: [],
        totalDoubt: '',
        totalResolved: '',
        totalEscalated: '',
        averageTime: '',
    }
    componentDidMount() {
        this.getTeacherDashboard();
    }

    getTeacherDashboard = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(URL + 'teacher/dashboard')
            .then((response) => {
                console.log(response.data);
                if (response.status == 200) {
                    let data = response.data.taList;
                    let td = 0;
                    if (response.data.totalDoubt != null) {
                        td = response.data.totalDoubt
                    }
                    this.setState({
                        totalDoubt: td,
                        totalEscalated: response.data.totalEscalated,
                        totalResolved: response.data.totalResolved,
                        averageTime: response.data.averageTime,
                        taList: data
                    })

                }
                // // let idx = 0;
                // let data = response.data.doubts;
                // // console.log(data);
                // data.forEach((element) => {
                //     console.log("small element");
                //     console.log(element);
                //     // element["key"] = idx++;
                // });
                // console.log(data);
                // this.setState({ post: data });
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data.error)
                    console.log(error.response.data.error);
                else console.log("Something went wrong :(");
            });
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-xl-3">
                            <div class="card bg-c-blue order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20">Doubts Asked</h6>
                                    <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span>{this.state.totalDoubt}</span></h2>
                                    <p class="m-b-0">Users are active, They like it<span class="f-right"></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 col-xl-3">
                            <div class="card bg-c-green order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20">Doubts Resolved</h6>
                                    <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>{this.state.totalResolved ? this.state.totalResolved : '0'}</span></h2>
                                    <p class="m-b-0">T.A's are doing good job<span class="f-right"></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 col-xl-3">
                            <div class="card bg-c-yellow order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20">Doubts Escalated</h6>
                                    <h2 class="text-right"><i class="fa fa-refresh f-left"></i><span>{this.state.totalEscalated ? this.state.totalEscalated : '0'}</span></h2>
                                    <p class="m-b-0">Great number! Congrats!<span class="f-right"></span></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 col-xl-3">
                            <div class="card bg-c-pink order-card">
                                <div class="card-block">
                                    <h6 class="m-b-20">Average Time</h6>
                                    <h2 class="text-right"><i class="fa fa-credit-card f-left"></i><span>{this.state.averageTime ? this.state.averageTime : '0'}</span></h2>
                                    <p class="m-b-0">Average doubt resolution time<span class="f-right"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default TeacherDashboard;
