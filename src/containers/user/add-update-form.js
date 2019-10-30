import React, { Component } from 'react'
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const { Item } = Form
const { Option } = Select

@Form.create()
class AddUpdate extends Component {

  static propTypes = {
    setForm:PropTypes.func.isRequired,
    user:PropTypes.object,
    roles:PropTypes.array
  }

  componentDidMount(){
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formLayout = {
      labelCol : { span : 4 },
      wrapperCol : { span : 16 }
    }
    const {user,roles} = this.props

    return (
      <Form {...formLayout}>
        <Item label="用户名">
          {
            getFieldDecorator('username',{
              initialValue:user.username
            })(<Input type="text" placeholder="请输入用户名"/>)
          }
        </Item>
        {
          !user._id? (
          <Item label="密码">
            {
              getFieldDecorator('password',{
                initialValue:''
              })(<Input type="password" placeholder="请输入密码"/>)
            }
          </Item>  
          ) : null
        }
        <Item label="手机号">
        {
              getFieldDecorator('phone',{
                initialValue:user.phone
              })(<Input type="phone" placeholder="请输入手机号"/>)
            }
        </Item>
        <Item label="邮箱">
        {
              getFieldDecorator('email',{
                initialValue:user.email
              })(<Input type="email" placeholder="请输入邮箱"/>)
            }
        </Item>
        <Item label="角色">
        {
              getFieldDecorator('role_id',{
                initialValue:user.role_id,
                rules:[
                  {required:true,message:'必须指定角色'}
                ]
              })(
                <Select style={{width:200}} placeholder="请选择角色">
                  {
                    roles.map(role => <Option key = {role._id} value={role._id}>{role.name}</Option> )
                  }
                </Select>
              )
            }
        </Item>

      </Form>
    )
  }
}
export default AddUpdate