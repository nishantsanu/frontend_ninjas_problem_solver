import React, { Component } from 'react';
import NavBar from '../Navbar/NavBar';
import ContentBuilder from '../ContentBuilder';

class Layout extends Component {
    state = {
        showBackdrop:false,
        showLoginForm:false,
        showSignUpForm:false,
        welcomeName:"",
        activeContentArea:"",
        solvingDoubtData:{},
    }
    componentDidMount(){
        if(localStorage.getItem('token')){
            this.setState({welcomeName:localStorage.getItem('userType')})
        }
    }

    homeButtonClickedHandler=()=>{
        console.log("moving to homepage");
        const prevActiveContentArea=this.state.activeContentArea;
        if(prevActiveContentArea==="") return;
        this.setState({activeContentArea:""});

    }

    solveDoubtButtonHandler=()=>{
        const prevActiveContentArea=this.state.activeContentArea;
        if(prevActiveContentArea==='solvedoubts') return;

        this.setState({activeContentArea:'solvedoubts'});
    }
    solvingDoubtButtonHandler=()=>{
        console.log("inside solving doubt button handler");
        if(!this.state.solvingDoubtData['_id']){
            return;
        }
        const prevActiveContentArea=this.state.activeContentArea;
        if(prevActiveContentArea==='solvingdoubt') return;

        this.setState({activeContentArea:'solvingdoubt'});
    }
    setSolvingDoubtData=(data)=>{
        if(data===''){
            this.setState({solvingDoubtData:'',activeContentArea:'solvedoubts'});
            return;
        }

        this.setState({solvingDoubtData:data,activeContentArea:'solvingdoubt'});
    }

    openDashboard=()=>{
        if(this.state.activeContentArea==='dashboard') return;
        this.setState({activeContentArea:'dashboard'});
    }

    logoutButtonHandler=()=>{
        this.setState({
            welcomeName:"",
            activeContentArea:"nouser",
        })
    }
    
    loginButtonHandler=()=>{
        var prev=this.state.showBackdrop;
        var prevL=this.state.showBackdrop;
        this.setState({showBackdrop:!prev,showLoginForm:!prevL})
    }
    signUpButtonHandler=()=>{
        this.setState({
            showBackdrop:true,
            showLoginForm:false,
            showSignUpForm:true,
        })
    }
    backDropClickHandler=()=>{
        this.setState({
            showBackdrop:false,
            showLoginForm:false,
            showSignUpForm:false,
        })
    }
    afterSuccessfulLogin=(user)=>{
        console.log(user);
        this.backDropClickHandler();
        this.setState({
            welcomeName:user.userType
        })
    }
    raiseDoubt=()=>{
        console.log("raising doubt "+this.state.activeContentArea);
        // if(this.state.activeContentArea==="raisedoubt"){
        //     return;
        // }
        this.setState({activeContentArea:"raisedoubt"})
    }
    render() {
        return (
            <div className="App">
                <NavBar 
                loginButtonHandler={this.loginButtonHandler} 
                signUpButtonHandler={this.signUpButtonHandler}
                backDropClickHandler={this.backDropClickHandler}
                showLoginForm={this.state.showLoginForm} 
                showBackdrop={this.state.showBackdrop}
                showSignUpForm={this.state.showSignUpForm}
                welcomeName={this.state.welcomeName}
                afterSuccessfulLogin={this.afterSuccessfulLogin}
                raiseDoubt={this.raiseDoubt}
                logoutButtonHandler={this.logoutButtonHandler}
                showTaDoubts={this.solveDoubtButtonHandler}
                openDashboard={this.openDashboard}
                solvingDoubt={this.solvingDoubtButtonHandler}
                homeButtonClickedHandler={this.homeButtonClickedHandler}/>
                <ContentBuilder welcomeName={this.state.welcomeName} 
                activeContentArea={this.state.activeContentArea}
                setSolvingDoubtData={this.setSolvingDoubtData}
                goToHomePage={this.homeButtonClickedHandler}
                solvingDoubtData={this.state.solvingDoubtData}/>
            </div>
        );
    }
}

export default Layout;