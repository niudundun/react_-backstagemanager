import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import './index.less'
import logo from "../../../assets/images/logo.png";
import MenuList from "../../../config/menu-config";
import { setHeaderTitle } from "../../../redux/action_creators/header_title";

const { SubMenu, Item } = Menu;

@connect(state => ({ headerTitle: state.headerTitle }),{ setHeaderTitle })
@withRouter
class LeftNav extends Component {

  getMenuNodes = (MenuList) => {
    const path = this.props.location.pathname
    return MenuList.map(item => { 
      if (!item.children) {
        // 不能只点击才更新头部标题，只要key和path一致就该更新，但是当标题已经更新后，就不要重复更新了
        if (item.key === path && this.props.headerTitle !== item.title) {
          this.props.setHeaderTitle(item.title)
        }
        return (
          <Item key={item.key}>
            <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {
        if (item.children.some(item => item.key === path)) {
          this.openKeys = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  render() {
    const menuList = this.getMenuNodes(MenuList)
    const selectedKeys = this.props.location.pathname
    return (
      <div className="left-nav">
        <header className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKeys]}
          defaultOpenKeys={[this.openKeys]}
        >
          {menuList}
        </Menu>
      </div>
    )
  }
}
export default LeftNav