import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'


import { removeUserToken } from "../../../redux/action_creators/user";
import './index.less'
import LinkButton from '../../../components/link-button'

@connect(state => ({user:state.user.user.username}),
  {removeUserToken})
@withRouter
class Header extends Component {
  state={
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  signout = () => {
    this.props.removeUserToken()
  }
  
componentDidMount(){
  this.intervalId = setInterval(() => {
    this.setState({currentTime:dayjs().format('YYYY-MM-DD HH:mm:ss')})
  }, 1000);
}

componentWillUnmount(){
  clearInterval(this.intervalId)
}

  render() {
    const path = this.props.location.pathname
    const {currentTime} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{this.props.username}</span>
          <LinkButton onClick={this.signout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left" >{path}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
            <span>晴天☀</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header