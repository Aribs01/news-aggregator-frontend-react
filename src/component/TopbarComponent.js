import React from 'react';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { MdLightMode, MdNightlight } from 'react-icons/md'
import '../assets/styles/topbar.scss';

class TopbarComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      theme: 'light',
      dialogBackground: '#fffffe',
      dialogColor: '#272343',
      loginDialog: false,
      registerDialog: false,
      date: new Date().toLocaleDateString()
    }
  }

  toggleTheme = () => {
    if(this.state.theme === 'dark'){
      localStorage.setItem("theme", "light");
      this.setState({
        theme: 'light',
        dialogBackground: '#fffffe',
        dialogColor: '#272343',
      })
    }
    else {
      localStorage.setItem("theme", "dark");
      this.setState({
        theme: 'dark',
        dialogBackground: '#272343',
        dialogColor: '#fffffe',
      })
    }
    document.body.classList.toggle("dark-theme");
  }
  
  toggleLoginDialog = () => {
    this.setState({
      registerDialog: false
    })
    if (this.state.loginDialog === false) {
      this.setState({
        loginDialog: true
      })
    }
    else {
      this.setState({
        loginDialog: false
      })
    }
  }

  toggleRegisterDialog = () => {
    // this.setState({
    //   loginDialog: false
    // })
    if (this.state.registerDialog === false) {
        this.setState({
          registerDialog: true
        })
      }
      else {
        this.setState({
          registerDialog: false
        })
    }
  }

  render() {
  return (
    <div id='topbar'>
      <div className='main-icon-container'>
        <div className='date-container'>{ this.state.date }</div>
        <div className='icon-container'>
          <AiFillLinkedin className='icons' size={25} />
          <AiFillGithub className='icons' size={25} />
        </div>
      </div>

      <div className='main-topbar'>
        <div className='logo'>
          <div>24/7 NEWS</div>
        </div>
        <div className='button-container'>
            <div className='icon-container' onClick={this.toggleTheme}>
              { this.state.theme === 'light' ?  
                <MdNightlight className='icons' size={18} />
                :
                <MdLightMode className='icons' size={18} />
              }
            </div>
            <button onClick={this.toggleLoginDialog}>Login</button>
            <button onClick={this.toggleRegisterDialog}>Register</button>
        </div>
      </div>

      <div id='login-dialog'>
        {this.state.loginDialog && (
          <>
            <ReactDialogBox
              closeBox={this.toggleLoginDialog}
              headerBackgroundColor={ this.state.dialogBackground }
              bodyBackgroundColor={ this.state.dialogBackground }
              bodyTextColor={ this.state.dialogColor }
              closeButtonColor={ this.state.dialogColor }
              bodyHeight='260px'
              className="dialog"
              headerText='Login'
            >
              <div className='login-container'>
                <div className='header'>
                  Register&nbsp;
                  <span onClick={this.toggleLoginDialog}>
                    here
                  </span>
                  &nbsp;
                  if you don't have an account
                </div>

                <div className='field'>
                  <label>Username</label>
                  <input className='dialog-input' type="text" placeholder='Username' />
                </div>

                <div className='field'>
                  <label>Password</label>
                  <input className='dialog-input' type="password" placeholder='Password' />
                </div>

                <div className='field'>
                  <button>Login</button>
                </div>
              </div>
            </ReactDialogBox>
          </>
        )}
      </div>

      <div id='register-dialog'>
        {this.state.registerDialog && (
          <>
            <ReactDialogBox
              closeBox={this.toggleRegisterDialog}
              headerBackgroundColor={ this.state.dialogBackground }
              bodyBackgroundColor={ this.state.dialogBackground }
              bodyTextColor={ this.state.dialogColor }
              closeButtonColor={ this.state.dialogColor }
              bodyHeight='350px'
              className="dialog"
              headerText='Register'
            >
              <div className='login-container'>
                <div className='header'>
                  Already have an account ?
                  &nbsp;
                  <span onClick={this.toggleRegisterDialog}>
                    login
                  </span>
                </div>

                <div className='field'>
                  <label>Username</label>
                  <input className='dialog-input' type="text" placeholder='Username' />
                </div>

                <div className='field'>
                  <label>Password</label>
                  <input className='dialog-input' type="password" placeholder='Password' />
                </div>

                <div className='field'>
                  <label>Confirm Password</label>
                  <input className='dialog-input' type="password" placeholder='Password' />
                </div>

                <div className='field'>
                  <button>Create Account</button>
                </div>
              </div>
            </ReactDialogBox>
          </>
        )}
      </div>
    </div>
  )
}
}

export default TopbarComponent;