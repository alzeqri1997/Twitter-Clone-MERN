import React, { Component } from "react";



export default class AuthForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }


    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSumbit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");
            })
            .catch((e) => {
                return;
            })
    }

    render() {
        const { email, username, profileImageUrl } = this.state;
        const { heading, buttonText, signUp, errors, history, removeError } = this.props;
        history.listen(() => {
            removeError();
        })
        return (
            <div>
                <div className="row justify-content-md-center text-center" >
                    <div className="col-md-6">  
                        <form onSubmit={this.handleSumbit} >
                            <h2> {heading} </h2>
                            <label htmlFor="email"> Email: </label>
                            {errors.message && <div className="alert alert-danger"> {errors.message} </div> }
                            <input
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                                type="text"
                            />
                            <label htmlFor="password"> Password: </label>
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                type="password"
                            />
                            {
                                signUp && (
                                    <div>
                                        <label htmlFor="email"> Username: </label>
                                        <input
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            onChange={this.handleChange}
                                            value={username}
                                            type="text"
                                        />
                                        <label htmlFor="profileImageUrl"> Image URL: </label>
                                        <input
                                            className="form-control"
                                            id="profileImageUrl"
                                            name="profileImageUrl"
                                            onChange={this.handleChange}
                                            type="profileImageUrl"
                                            value={profileImageUrl}
                                        />
                                    </div>
                                )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg"  >
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
