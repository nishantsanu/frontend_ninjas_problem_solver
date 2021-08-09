import React from 'react';
import './TaDoubtContainer.css';
import axios from 'axios';
import { message } from 'antd';
const URL = "http://localhost:8000";

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

                            {/* <div class="forum-item active">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-shield"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">General Discussion</a>
                                        <div class="forum-sub-title">Talk about sports, entertainment, music, movies, your favorite color, talk about enything.</div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            1216
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            368
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            140
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {doubtList}
                            {/* <div class="forum-item">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-bolt"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">Introductions</a>
                                        <div class="forum-sub-title">New to the community? Please stop by, say hi and tell us a bit about yourself. </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            890
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            120
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            154
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="forum-item active">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">Announcements</a>
                                        <div class="forum-sub-title">This forum features announcements from the community staff. If there is a new post in this forum, please check it out. </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            680
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            124
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            61
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="forum-item">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-star"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">Staff Discussion</a>
                                        <div class="forum-sub-title">This forum is for private, staff member only discussions, usually pertaining to the community itself. </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            1450
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            652
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            572
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="forum-title">
                                <div class="pull-right forum-desc">
                                    <samll>Total posts: 17,800,600</samll>
                                </div>
                                <h3>Other subjects</h3>
                            </div>

                            <div class="forum-item">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-clock-o"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">Lorem Ipsum is simply dummy text. </a>
                                        <div class="forum-sub-title">Various versions have evolved over the years, sometimes by accident, sometimes on purpose passage of Lorem Ipsum (injected humour and the like).</div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            1516
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            238
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            180
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="forum-item">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-bomb"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">There are many variations of passages</a>
                                        <div class="forum-sub-title"> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the . </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            1766
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            321
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            42
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="forum-item">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-bookmark"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">The standard chunk of Lorem Ipsum</a>
                                        <div class="forum-sub-title">Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            765
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            90
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            11
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="forum-item">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="forum-icon">
                                            <i class="fa fa-ambulance"></i>
                                        </div>
                                        <a href="forum_post.html" class="forum-item-title">Lorem Ipsum, you need to be sure there</a>
                                        <div class="forum-sub-title">Internet tend to repeat predefined chunks as necessary, making this the</div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            2550
                                        </span>
                                        <div>
                                            <small>Views</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            122
                                        </span>
                                        <div>
                                            <small>Topics</small>
                                        </div>
                                    </div>
                                    <div class="col-md-1 forum-info">
                                        <span class="views-number">
                                            92
                                        </span>
                                        <div>
                                            <small>Posts</small>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaDoubtContainer;