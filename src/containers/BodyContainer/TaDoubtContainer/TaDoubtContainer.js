import React from 'react';
import './TaDoubtContainer.css';
import axios from 'axios';
import { message } from 'antd';
const URL = "https://ninjasproblemsolver.herokuapp.com";

const TaDoubtContainer = (props) => {

    function acceptDoubt(event) {
        console.log(event.target);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const data = {
            doubtId: event.target.value,
        }
        axios
            .post(URL + "/doubt/accept-doubt", data)
            .then((response) => {
                console.log(response);
                if (response.status === 202) {
                    let currDoubt={};
                    props.doubts.map((item)=>{
                        if(item._id===event.target.value){
                            currDoubt=item;
                        }
                    });
                    currDoubt['status']='inresolution'
                    message.success("Doubt Accepted");
                    props.setSolvingDoubtData(currDoubt);
                    
                } else if (response.status === 400) {
                    message.warning("You already have a pending doubt");
                }else{
                    message.error("Cant Accept the Doubt");
                }
            })
            .catch((error) => {
                message.error("Cant Accept the Doubt");
            });
    }

    const doubtList = props.doubts.map((item) => {
        if (item.status !== "active") { return null; }
        const date1 = new Date(item.createdAt).toLocaleString().substring(0, 5);
        // const date2 = new Date().toLocaleDateString;
        // var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
        let des = item.description;
        des = des.length > 31 ? des.substring(0, 30) : des;
        return (
            <div class="forum-item active" key={item._id}>
                <div class="row">
                    <div class="col-md-9">
                        <div class="forum-icon">
                            <i class="fa fa-shield"></i>
                        </div>
                        <a href="forum_post.html" class="forum-item-title">{item.title}</a>
                        <div class="forum-sub-title">{des}</div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number">
                            {date1}
                        </span>
                        <div>
                            <small>Posted</small>
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number">
                            {item.comments.length}
                        </span>
                        <div>
                            <small>Comments</small>
                        </div>
                    </div>
                    <div class="col-md-1 forum-info" >
                        <button type="button"
                            value={item._id}
                            onClick={acceptDoubt}
                            style={{ paddingRight: "7px", paddingLeft: "7px" }} class="btn btn-success">Accept</button>

                    </div>
                </div>
            </div>
        );
    })


    return (
        <div class="container tadoubtlist">
            <div class="row">
                <div class="col-lg-12">
                    <div class="wrapper wrapper-content animated fadeInRight">

                        <div class="ibox-content m-b-sm border-bottom">
                            <div class="p-xs">
                                <div class="pull-left m-r-md">
                                    <i class="fa fa-globe text-navy mid-icon"></i>
                                </div>
                                <h2>Welcome TA to help learners</h2>
                                <span>Feel free to choose topic you're interested in.</span>
                            </div>
                        </div>

                        <div class="ibox-content forum-container">

                            <div class="forum-title">
                                <div class="pull-right forum-desc">
                                    <samll>Total doubts: {props.doubts.length}</samll>
                                </div>
                                <h3>Active Doubts</h3>
                            </div>

                            {doubtList}
                           

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaDoubtContainer;