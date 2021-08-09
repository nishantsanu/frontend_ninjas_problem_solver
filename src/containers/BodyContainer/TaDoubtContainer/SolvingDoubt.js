import React, { Component } from 'react';
import axios from 'axios';
import './SolvingDoubt.css';
import { message } from 'antd';
const URL = "http://localhost:8000";

class SolvingDoubt extends Component {
    state = {
        answer:''
    }

    onAnswerChange=(event)=>{
        this.setState({
            answer:event.target.value
        })

    }
    onSubmitAnswer=()=>{
        console.log(this.state.answer);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const data = {
           doubt: this.props.solvingDoubtData._id,
           answer:this.state.answer,
        }
        axios
           .post(URL + "/doubt/solved-doubt", data,)
           .then((response) => {
              console.log(response);
              if (response.status === 200) {
                  message.success('Answer Posted');
                  this.props.setSolvingDoubtData('');
              }else{
                message.error('Something is missing');
              }
           })
           .catch((error) => {
              message.error('Oops! Cant Post the Answer');
           });
        return;
    }

    onEscalateDoubt=()=>{
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const data = {
           doubt: this.props.solvingDoubtData._id,
        }
        axios
           .post(URL + "/doubt/escalate-doubt", data,)
           .then((response) => {
              console.log(response);
              if (response.status === 200) {
                  message.success('Doubt Escalated! Solve another')
                  this.props.setSolvingDoubtData('');
              }else{
                message.warn('Something is wrong');
              }
           })
           .catch((error) => {
              message.error('Opps, there is some issue');
           });
        return;
    }

    commentView = this.props.solvingDoubtData.comments.map(singleComment => {
        return (<li key={singleComment._id}>{singleComment.description}</li>);
    })

    render() {
        return (
            <div>
                <div class="card post" >
                    <div class="card-body" style={{ background: "#b593cc54" }}>
                        <div class="upperband">
                            <h5 class="card-title"
                            >{this.props.solvingDoubtData.title}</h5>
                        </div>

                        <p class="card-text">{this.props.solvingDoubtData.description}</p>
                        <div><span className="askedby"><strong>Asked By : {this.props.solvingDoubtData.postedBy.email}</strong> on
                            {this.props.solvingDoubtData.createdAt.toLocaleString().substring(0, 10)}
                        </span></div>
                        <hr></hr>
                        <ul>
                            {this.commentView}
                        </ul>
                    </div>
                </div>


                <div class="card post" >
                    <div class="card-body" style={{ background: "#b593cc54" }}>
                        <div class="upperband">
                            <h5 class="card-title">You can solve it</h5>
                            {/* <div>{this.props.solvingDoubtData.status} */}
                            {/* </div> */}
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Answer Area</label>
                            <textarea onChange={this.onAnswerChange}
                            class="form-control rounded-0" value={this.state.answer} id="exampleFormControlTextarea1" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="div-inline">
                        <div class="form-group mb-2">
                            <button onClick={this.onSubmitAnswer}
                            type="button" class="btn btn-success btn-lg">Submit Answer</button>
                            <button onClick={this.onEscalateDoubt}
                            type="button" style={{float:'right'}} class="btn btn-secondary btn-lg">Escalate</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default SolvingDoubt;