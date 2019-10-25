import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { Modal, Button, Icon } from 'antd';
import screenfull from "screenfull";

import { removeUserToken } from "../../../redux/action_creators/user";
import './index.less'
import LinkButton from '../../../components/link-button'
import { reqWeather } from "../../../api/index";

const { confirm } = Modal;

@connect(state => ({ username: state.user.user.username,headerTitle:state.headerTitle }),
  { removeUserToken })
@withRouter
class Header extends Component {
  state = {
    currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: '',
    weather: '',
    isFullScreen:false,
  }
  signout = () => {
    confirm({
      title: 'Do you Want to sign out?',
      // 不改成箭头函数的话 this 指向出错
      onOk: () => {
        this.props.removeUserToken()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss') })
    }, 1000);
    this.showWeather()

    screenfull.onchange(()=>{
      this.setState({
        isFullScreen:!this.state.isFullScreen
      })
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {

    const { currentTime, dayPictureUrl, weather,isFullScreen } = this.state
    return (
      <div className="header">
        <div className="header-top">
          <Button onClick={this.handleFullScreen}>
            <Icon type={isFullScreen?'fullscreen-exit':'fullscreen'}/>
          </Button>&nbsp;
          <span>欢迎，{this.props.username}</span>
          <LinkButton onClick={this.signout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left" >{this.props.headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default Header