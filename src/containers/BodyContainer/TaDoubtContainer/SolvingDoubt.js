import React, { Component } from 'react';
import axios from 'axios';
import './SolvingDoubt.css';
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
        return;
    }

    onEscalateDoubt=()=>{
        console.log("escalating doubt");
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
                            {/* <div>{this.props.solvingDoubtData.status} */}
                            {/* </div> */}
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