import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeUserToken } from "../../redux/action_creators/user";

export default function WithCheckLogin(WrappedComponent) {
  @connect(state => ({hasLogin:state.user.hasLogin}),{removeUserToken})
    class HocComponent extends React.Component{
      render(){
        const path = this.props.location.pathname
        const {hasLogin,...rest} = this.props
        if( path === '/login' && hasLogin ) return <Redirect to="/"/>
        if( path !== '/login' && !hasLogin ) return <Redirect to="/login"/>
        return <WrappedComponent {...rest}/>
      }
    }
    return HocComponent
}
//if(!this.props.hasLogin){
//   return 
// }