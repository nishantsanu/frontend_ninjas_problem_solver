
import React, { Component } from 'react';
import axios from 'axios';
import './TeacherDashboard.css';
const URL = "https://ninjasproblemsolver.herokuapp.com";

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
            .get(URL + '/teacher/dashboard')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ taList: response.data.taList });
                    let td = 0;
                    if (response.data.totalDoubt != null) {
                        td = response.data.totalDoubt
                    }
                    console.log(response.data.averageTime);
                    this.setState({
                        totalDoubt: td,
                        totalEscalated: response.data.totalEscalated,
                        totalResolved: response.data.totalResolved,
                        averageTime: response.data.averageTime,
                    })

                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data.error)
                    console.log(error.response.data.error);
                else console.log("Something went wrong :(");
            });
    }
    getTaTable=()=>{
        const taTable = this.state.taList.map((ta) => {
            return (
                <tr>
                    <td>{ta.email}</td>
                    <td>{ta.countAcceptedDoubt}</td>
                    <td>{ta.countResolvedDoubt}</td>
                    <td>{ta.countEscalatedDoubt}</td>
                    <td>{(ta.solvedTime/ta.countAcceptedDoubt).toFixed(2)}</td>
                </tr>
            );
    
        })
        return taTable;
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
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Accepted</th>
                            <th scope="col">Resolved</th>
                            <th scope="col">Escalated</th>
                            <th scope="col">Avg Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTaTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TeacherDashboard;
