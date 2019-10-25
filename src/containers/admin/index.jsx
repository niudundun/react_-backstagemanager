import React, { Component } from 'react'
// import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';

// import { removeUserToken } from "../../redux/action_creators/user";
// import { reqUsersList } from "../../api";
import WithCheckLogin from "../with-check-login";
import LeftNav from "./left-nav";
import Header from "./header";
import Home from "../../components/home";
import Category from "../category";
import Product from "../product";
import Role from "../role";
import User from "../user";
import Line from "../../components/charts/line";
import Bar from "../../components/charts/bar";
import Pie from "../../components/charts/pie";

const {  Footer, Sider, Content } = Layout;
@WithCheckLogin
class Admin extends Component {

  render() {

    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home'/>
            </Switch>
          </Content>

          <Footer style={{textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin