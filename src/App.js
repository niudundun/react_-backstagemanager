import React, {Component} from 'react'

import {HashRouter, Route, Switch} from 'react-router-dom'

import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"

export default class App extends Component {

  render () {
    return (
      <HashRouter>
        <Switch> {/* /login/xxx   默认使用不完全匹配 | 使用第一个匹配的路由 */}
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
      </HashRouter>
    )
  }
}
