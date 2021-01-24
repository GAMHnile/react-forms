import React, { Component } from "react";

function ValidationMessage(props) {
  if (!props.valid) {
    return (
      <div className="alert-danger" role="alert">
        {props.message}
      </div>
    );
  }
  return null;
}

class StandardForm extends Component {
  state = {
    username: "",
    usernameValid: false,
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    confirmPassword: "",
    confirmPasswordValid: false,
    formValid: false,
    errorMsg: {},
  };
  formValidHandler = () => {
    const {
      usernameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
    } = this.state;
    const formValid =
      usernameValid && emailValid && passwordValid && confirmPasswordValid;
    this.setState({ formValid });
  };
  usernameValidHandler = () => {
    const { username } = this.state;
    let usernameValid = true;
    const errorMsg = { ...this.state.errorMsg };
    if (username.length < 5) {
      errorMsg.username = "Username length must be more than 5 characters";
      usernameValid = false;
    }
    this.setState({ usernameValid, errorMsg }, this.formValidHandler);
  };

  emailValidHandler = () => {
    const { email } = this.state;
    let emailValid = true;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errorMsg = { ...this.state.errorMsg };
    if (!re.test(email.toLowerCase())) {
      errorMsg.email = "Email is invalid";
      emailValid = false;
    }
    this.setState({ emailValid, errorMsg }, this.formValidHandler);
  };

  passwordValidHandler = () => {
    const { password } = this.state;
    let passwordValid = true;
    const errorMsg = { ...this.state.errorMsg };
    if (password.length < 5) {
      errorMsg.password = "Password length must be more than 5 characters";
      passwordValid = false;
    }
    this.setState({ passwordValid, errorMsg }, this.formValidHandler);
  };

  confirmPasswordValidHandler = () => {
    const { password, confirmPassword } = this.state;
    let confirmPasswordValid = true;
    const errorMsg = { ...this.state.errorMsg };
    if (password !== confirmPassword) {
      errorMsg.confirmPassword = "Passwords do not match";
      confirmPasswordValid = false;
    }
    this.setState({ confirmPasswordValid, errorMsg }, this.formValidHandler);
  };

  resetForm= (event)=>{
    event.preventDefault();
    this.setState({
      username: "",
      usernameValid: false,
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false,
      confirmPassword: "",
      confirmPasswordValid: false,
      formValid: false,
      errorMsg: {},
    });
  }
  render() {
    return (
      <div>
        <h5>Standard form</h5>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={this.state.username}
              onChange={(e) =>
                this.setState(
                  { username: e.target.value },
                  this.usernameValidHandler
                )
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.usernameValid}
                message={this.state.errorMsg.username}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={(e) =>
                this.setState({ email: e.target.value }, this.emailValidHandler)
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.emailValid}
                message={this.state.errorMsg.email}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={(e) =>
                this.setState(
                  { password: e.target.value },
                  this.passwordValidHandler
                )
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.passwordValid}
                message={this.state.errorMsg.password}
              />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={(e) =>
                this.setState(
                  { confirmPassword: e.target.value },
                  this.confirmPasswordValidHandler
                )
              }
            />
            <span>
              <ValidationMessage
                valid={this.state.confirmPasswordValid}
                message={this.state.errorMsg.confirmPassword}
              />
            </span>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="submit" disabled={!this.state.formValid}>Submit</button>
            <button className="btn btn-danger" onClick={this.resetForm}>Reset</button>
          </div>
        </form>
        <p>username: {this.state.username}</p>
        <p>email: {this.state.email}</p>
        <p>password: {this.state.password}</p>
        <p>confirmPassword: {this.state.confirmPassword}</p>
      </div>
    );
  }
}

export default StandardForm;
