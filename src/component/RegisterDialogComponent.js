import React, { Component } from 'react';
import '../assets/styles/topbar.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { signup } from '../actions/auth';
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

class RegisterDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      loading: false,
      loading2: false,
      errStatus: false,
      errMessage: ''
    };
    this.handleRegister = this.handleRegister.bind(this);
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirm_password: e.target.value,
    });
  }

  handleRegister(e) {
    this.setState({ loading2: true });
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(signup
        (
          this.state.username, 
          this.state.email, 
          this.state.password, 
          this.state.confirm_password
        ))
        .then(() => {
          console.log(this.props);
          this.props.dispatch({ type: 'SIGNUP_SUCCESS' });
          console.log(this.props);
          toast('Account Created Successfully. Please Login')
          this.setState({ loading2: false });
          window.location.reload();
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
        <Form onSubmit={this.handleRegister} ref={(c) => { this.form = c; }}>
          <div className='field'>
            <label>Username</label>
            <Input
              value={this.state.username}
              onChange={this.onChangeUsername}
              validations={[required]}
              className='dialog-input'
              type="text"
              placeholder='Username' />
          </div>

          <div className='field'>
            <label>Email</label>
            <Input
              value={this.state.email}
              onChange={this.onChangeEmail}
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
            <label>Confirm Password</label>
            <Input
              className='dialog-input'
              type="password"
              placeholder='Password'
              value={this.state.confirm_password}
              onChange={this.onChangeConfirmPassword}
              validations={[required]} />
          </div>

          <div className='field'>
            <button onSubmit={this.handleRegister}>
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
              Create Account
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
export default connect(mapStateToProps)(RegisterDialogComponent);
