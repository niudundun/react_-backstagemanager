import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { removeUserToken } from "../../redux/action_creators/user";

 class Admin extends Component {
  signout = () => {
    this.props.removeUserToken()
  }
  render() {
    if(!this.props.hasLogin){
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <p>hello,{this.props.user.username}</p>
        <button onClick={this.signout}>退出登录</button>
      </div>
    )
  }
}

export default connect(
  //state中的user(reducer)里的user
  state => ({user:state.user.user,hasLogin:state.user.hasLogin}),
  {removeUserToken}
)(Admin)