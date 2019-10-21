import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';

import logo from './images/logo.png'
import './less/login.less'

const { Item } = Form

class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields(( err, values ) => {
      if (!err){

      }else{

      }
    })
    //可以获取被getFieldDecorator包裹的标签的值
    // const username = this.props.form.getFieldValue('username')
    // const password = this.props.form.getFieldValue('password')
  }

  validatePwd = ( rule, value, callback ) => {
    if( value === ''){
      callback('密码必须输入')
    } else if ( value.length < 4 || value.length > 12 ){
      callback('密码必须大于等于4位且小于等于12位')
    } else if ( !/^[a-zA-Z0-9_]+$/.test(value) ){
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                initialValue:'',
                rules: [
                  { required: true, message: '用户名必须输入!' },
                  { min : 4, message : '用户名不能小于4位'},
                  { max : 12, message : '用户名不能大于12位'},
                  { pattern : /^[a-zA-Z0-9_]+$/, message : '用户名必须是英文、数字或下划线组成'}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue:'',
                rules:[
                  {validator : this.validatePwd}
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)