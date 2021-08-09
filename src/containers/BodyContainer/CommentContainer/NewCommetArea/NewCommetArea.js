import React, { Component } from 'react';
import axios from 'axios';
import { message } from 'antd';
const URL = "https://ninjasproblemsolver.herokuapp.com";


class NewCommentArea extends Component {
    constructor(props) {
        super(props)
        // ...
        this.state={
            comment: ''
        }
        this.commentInputHandle = this.commentInputHandle.bind(this)
      }

    addCommentHandler = async () => {
        console.log("proceed to signin");
        const data = {
            parentDoubt: this.props.parentPost,
            commentDescription: this.state.comment,
        }
        
        console.log(data);
        axios.defaults.headers.common['Authorization']=localStorage.getItem('token');
        axios
            .post(URL + "/doubt/add-comment", data)
            .then((response) => {
                if (response.status === 200) {
                    message.success('Comment Added');
                    this.props.updateCommentList(response.data.comment);
                }else{
                    message.error('Failed to add comment');
                }
                
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data.error);
                  }
                  message.error('Failed to add comment');
            });
    }

    commentInputHandle(event) {
        this.setState({ comment: event.target.value });
    }
    render() {
        return (
            <div class="container my-5">
                <div class="row">
                    <div class="col-md-12">
                            <div class="input-group flex-fill">
                                <input onChange={this.commentInputHandle}
                                
                                    type="search" name="search"  value={this.state.comment} placeholder="write your suggestion" class="form-control" aria-label="Search this site" />
                                <div class="input-group-append">
                                    <input onClick={this.addCommentHandler}
                                        type="submit" name="commit" style={{backgroundColor: "#0A6DFE"}} value="Comment" class="btn btn-primary !btnboot" data-disable-with="Search" />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCommentArea;
