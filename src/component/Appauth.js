import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { Outlet } from 'react-router-dom';

class Appauth extends Component{
    render(){
        const user = this.props;

        if (user.user === false) {
          return <Navigate to="/" />;
        }
        return(
            <div>
              <Outlet />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const user = state?.auth?.isLoggedIn;
    return {
      user,
    };
}
export default connect(mapStateToProps)(Appauth);