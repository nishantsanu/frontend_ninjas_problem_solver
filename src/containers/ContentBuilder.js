import React, { Component } from 'react';
import Content from './Content/Content';
import axios from 'axios';
import RaiseDoubtContainer from './BodyContainer/RaiseDoubtContainer';
import TaDoubtContainer from './BodyContainer/TaDoubtContainer/TaDoubtContainer';
import TeacherDashboard from './BodyContainer/TeacherDashboard/TeacherDashboard';
import SolvingDoubt from './BodyContainer/TaDoubtContainer/SolvingDoubt';

const URL='https://ninjasproblemsolver.herokuapp.com/';
class ContentBuilder extends Component {
    state = {
        post: [],
        showBackdrop: false,
        openLoginForm: false,
    }

    componentDidMount(){
        this.getAllPost();
    }
    getAllPost = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(URL)
            .then((response) => {
                console.log(response.data.doubts);
                let data = response.data.doubts;
                this.setState({ post: data });
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data.error)
                    console.log(error.response.data.error);
                else console.log("Something went wrong :(");
            });
    }

    updateCommentList=(comment)=>{
        console.log("inside update comment list");
        if(!comment) return;
        console.log("comment present");
        const parent=comment.parentDoubt;
        const newList=[];
        this.state.post.forEach(post => {
            if(post._id===parent){
                var tempPost=post;
                tempPost['comments'].unshift(comment);
                newList.push(post);
            }else{
                newList.push(post);
            }
        });
        console.log("new List is "+newList);

        this.setState({posts:newList});
    }

    addNewDoubt=(doubt)=>{
        const oldDoubts=[...this.state.post];
        oldDoubts.unshift(doubt);
        this.setState({
            post:oldDoubts
        })
        this.props.goToHomePage();
    }

    containerToView = () => {
        console.log("container to view is " + this.props.activeContentArea);
        if(this.props.activeContentArea==='solvedoubts'){
            return <TaDoubtContainer doubts={this.state.post} setSolvingDoubtData={this.props.setSolvingDoubtData}/>
        }else if(this.props.activeContentArea==='dashboard'){
            return <TeacherDashboard/>
        }else if(this.props.activeContentArea==='solvingdoubt'){
            return <SolvingDoubt solvingDoubtData={this.props.solvingDoubtData} setSolvingDoubtData={this.props.setSolvingDoubtData}/>
        }else if(this.props.activeContentArea==='raisedoubt'){
            return <RaiseDoubtContainer addNewDoubt={this.addNewDoubt}/>
        }else{
            return <Content posts={this.state.post} welcomeName={this.props.welcomeName} showBackdrop={this.state.showBackdrop}
            loginButtonClick={this.loginModelHandler} 
            updateCommentList={this.updateCommentList}/>
        }
    }

    loginModelHandler = () => {
        this.setState({ showBackdrop: true });
    }
    render() {
        return (
            this.containerToView()
        );
    }
}

export default ContentBuilder;