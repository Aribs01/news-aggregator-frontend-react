import React, { Component } from 'react';
import '../assets/styles/topbar.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { login } from '../actions/auth';
import toast, { Toaster } from 'react-hot-toast';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class LoginDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.showError = this.showError.bind(this);
    this.state = {
      email: "",
      password: "",
      loading: false,
      loading2: false,
      errStatus: false,
      errMessage: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  onChangeUsername(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin(e) {
    this.setState({ loading2: true });
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          this.props.dispatch({ type: 'LOGIN_SUCCESS' });
          this.setState({ loading2: false });
          window.location.href = "/for-me";
        })
        .catch(() => {
          this.setState({ loading2: false });
          toast('Error Invalid Credentials')

          this.setState({
            loading: false,
            errStatus: true,
            errMessage: 'Error Invalid Credentials'
          });
        });
    } else {
      toast('Error')
      this.setState({
        loading: false,
        loading2: false,
        errStatus: true,
        errMessage: 'error'
      });
    }
  }

  render() {
    return (
      <div className='login-container'>
        <Toaster toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            color: '#713200',
          },
        }} />
        <Form onSubmit={this.handleLogin} ref={(c) => { this.form = c; }}>
          <div className='field'>
            <label>Username</label>
            <Input
              value={this.state.email}
              onChange={this.onChangeUsername}
              validations={[required]}
              className='dialog-input'
              type="text"
              placeholder='Username' />
          </div>

          <div className='field'>
            <label>Password</label>
            <Input
              className='dialog-input'
              type="password"
              placeholder='Password'
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]} />
          </div>

          <div className='field'>
            <button onSubmit={this.handleLogin}>
              {
                (this.state.loading || this.state.loading2) && (
                  <>
                    <span>
                      <AiOutlineLoading3Quarters />
                      &nbsp;
                    </span>
                  </>
                )
              }
              Login
            </button>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </div>
        </Form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}
export default connect(mapStateToProps)(LoginDialogComponent);
