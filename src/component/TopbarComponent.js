import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { MdLightMode, MdNightlight } from 'react-icons/md'
import '../assets/styles/topbar.scss';
import LoginDialogComponent from './LoginDialogComponent';
import RegisterDialogComponent from './RegisterDialogComponent';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

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
    if (this.state.theme === 'dark') {
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

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout())
  }

  render() {
    const { isLoggedIn } = this.props;
    const user = this.props;
    const username = user.user?.auth?.user?.data?.username

    return (
      <div id='topbar'>
        <div className='main-icon-container'>
          <div className='date-container'>{this.state.date}</div>
          <div className='icon-container'>
            <AiFillLinkedin className='icons' size={25} />
            <AiFillGithub className='icons' size={25} />
          </div>
        </div>

        <div className='main-topbar'>
          <div className='logo'>
            <div className='main-logo'>24/7 NEWS</div>
            <div className='menu-container'>
              <ul>
                <li className='item'>
                  <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
                </li>
                {
                  isLoggedIn === true &&
                  <li className='item'>
                    <NavLink exact="true" to="/for-me" activeclassname="active">For Me</NavLink>
                  </li>
                }
              </ul>
            </div>
          </div>

          <div className='button-container'>
            <div>
              {
                (isLoggedIn === true && username) &&
                <span>Hi, {username}</span>
              }
            </div>
            <div className='icon-container' onClick={this.toggleTheme}>
              {this.state.theme === 'light' ?
                <MdNightlight className='icons' size={18} />
                :
                <MdLightMode className='icons' size={18} />
              }
            </div>
            {
              isLoggedIn === false ?
                <>
                  <button onClick={this.toggleLoginDialog}>Login</button>
                  <button onClick={this.toggleRegisterDialog}>Register</button>
                </>
                :
                <>
                  <button onClick={this.handleLogout}>Logout</button>
                </>

            }
          </div>
        </div>

        <div id='login-dialog'>
          {this.state.loginDialog && (
            <>
              <ReactDialogBox
                closeBox={this.toggleLoginDialog}
                headerBackgroundColor={this.state.dialogBackground}
                bodyBackgroundColor={this.state.dialogBackground}
                bodyTextColor={this.state.dialogColor}
                closeButtonColor={this.state.dialogColor}
                bodyHeight='260px'
                className="dialog"
                headerText='Login'
              >
                <LoginDialogComponent />
              </ReactDialogBox>
            </>
          )}
        </div>

        <div id='register-dialog'>
          {this.state.registerDialog && (
            <>
              <ReactDialogBox
                closeBox={this.toggleRegisterDialog}
                headerBackgroundColor={this.state.dialogBackground}
                bodyBackgroundColor={this.state.dialogBackground}
                bodyTextColor={this.state.dialogColor}
                closeButtonColor={this.state.dialogColor}
                bodyHeight='350px'
                className="dialog"
                headerText='Register'
              >
                <RegisterDialogComponent />
              </ReactDialogBox>
            </>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const user = state
  const { message } = state.message;
  return {
    isLoggedIn,
    user,
    message
  };
}

export default connect(mapStateToProps)(TopbarComponent);