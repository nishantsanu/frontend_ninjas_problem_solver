import React, { Component } from 'react';
import axios from 'axios';
const URL = "http://localhost:8000";

class NewCommentArea extends Component {
    constructor(props) {
        super(props)
        // ...
        this.state={
            comment: ''
        }
        this.commentInputHandle = this.commentInputHandle.bind(this)
      }
      
    // state = {
    //     comment: '',
    // }

    addCommentHandler = async () => {
        console.log("proceed to signin");
        const data = {
            parentDoubt: this.props.parentPost,
            commentDescription: this.state.comment,
        }
        
        console.log(data);
        axios.defaults.headers.common['Authorization']=localStorage.getItem('token');
 //       axios.defaults.headers.common['Content-Type']='application/json';
        axios
            .post(URL + "/doubt/add-comment", data)
            .then((response) => {
                console.log(response.data.comment);
                if (response.status === 200) {
                    this.props.updateCommentList(response.data.comment);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data.error);
                  }
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
                        {/* <form class="form-inline" accept-charset="UTF-8"  > */}
                            <div class="input-group flex-fill">
                                <input onChange={this.commentInputHandle}
                                
                                    type="search" name="search"  value={this.state.comment} placeholder="write your suggestion" class="form-control" aria-label="Search this site" />
                                <div class="input-group-append">
                                    <input onClick={this.addCommentHandler}
                                        type="submit" name="commit" style={{backgroundColor: "#0A6DFE"}} value="Comment" class="btn btn-primary !btnboot" data-disable-with="Search" />
                                </div>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewCommentArea;
