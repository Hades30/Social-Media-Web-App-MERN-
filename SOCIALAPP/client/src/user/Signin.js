import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { signin, authenticate } from "../auth/Index";
import SocialLogin from "./SocialLogin";

import Loading from '../loading/Loading';
const f= {
    color : "white"
}

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        }
    }

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    handleChange = e => {
        this.setState({
            error: "",
            [e.target.name]: e.target.value
        });
    };

    clickSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = { email, password };
        // console.log(user);
        if (this.state.recaptcha) {
            signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    });
                }
            });
        }  else {
            this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
        }
        
    };
    

    signinForm = (email, password, loading, recaptcha) => (
        <form style={{ display: loading ? "none" : "" }} >
            <div className="form-group">
                <label className="text-muted"  ><span style={{fontSize : "20px" ,color: "white"}}>
                Email
                </span></label>
                <input
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    style = {f}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted"><span style={{fontSize : "20px" ,color: "white"}}>
                Password
                </span></label>
                <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    style = {f}
                    className="form-control"
                    value={password}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    {recaptcha ? <span style={{fontSize : "20px" ,color: "white"}}>
                Success 
                </span> : <span style={{fontSize : "20px" ,color: "white"}}>
                What day is today?
                </span>}
                </label>
                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    style = {f}
                    className="form-control"
                />
            </div>

            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary" ><span style= {{color:"white"}}>Submit</span></button>
        </form>
    )

    render() {

        const { email, password, error, redirectToReferer, loading, recaptcha } = this.state;
        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: "10px"}}>
                <h2 className="mt-5 mb-5" style={{textAlign : "center",fontSize : "40px"}}><span style={{color: "white"}}>
                Sign In
                </span></h2>
                <SocialLogin />
                <hr />
                <p className="text-center text-muted" style={{fontSize: "24px"}} ><span style={{color : "white"}}>OR

                </span></p>
                <hr />
                <hr />

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {this.signinForm(email, password, loading,recaptcha)}

                {loading ? (
                    <Loading />
                ) : (
                        ""
                    )}
                <p>
                    <Link to="/forgot-password" className="btn btn-raised btn-danger">
                        {" "}
                    Forgot Password
                </Link>
                </p>
            </div>
        );
    }
}

export default Signin;