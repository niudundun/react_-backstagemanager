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
  /* 
  getMenuNodes = (MenuList) => {
    const path = this.props.location,pathname
    return MenuList.reduce((pre,item)=>{
      if(!item.children){
        if (item.key === path && this.props.headerTitle !== item.title) {
          this.props.setHeaderTitle(item.title)
        }
        pre.push(
          <Item key={item.key}>
            <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      }else{
         if (item.children.some(item => item.key === path)) {
          this.openKeys = item.key
        }
        pre.push(
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
      return pre
    },[])
  }
  */
  getMenuNodes = (MenuList) => {
    const path = this.props.location.pathname
    return MenuList.map(item => { 
      if (!item.children) {
        // 不能只点击才更新头部标题，只要key和path一致就该更新，但是当标题已经更新后，就不要重复更新了
        if (path.indexOf(item.key)===0 && this.props.headerTitle !== item.title) {
          this.props.setHeaderTitle(item.title)
        }
        return (
          //item.key为遍历的MenuList里每个元素的key
          <Item key={item.key}>
            <Link to={item.key} onClick={()=>this.props.setHeaderTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {
        if (item.children.some(item => path.indexOf(item.key)===0)) {
          this.openKey = item.key
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
    let selectedKey = this.props.location.pathname
    if (selectedKey.indexOf('/product/')===0) {
      selectedKey = '/product'
    }
   
    return (
      <div className="left-nav">
        <header className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[this.openKey]}
        >
          {menuList}
        </Menu>
      </div>
    )
  }
}
export default LeftNav