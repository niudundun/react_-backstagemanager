import React, { Component } from 'react'
import { Form,Input } from 'antd'
import PropTypes from "prop-types";

const {Item} = Form

@Form.create()
class AddForm extends Component {

  static propTypes = {
    setForm:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formLayout = {
      labelCol:{span:4},
      wrapperCol:{span:16}
    }
    return (
      <Form>
        <Item label="角色名称" {...formLayout}>
          {
            getFieldDecorator('roleName',{
              initialValue:'',
              rules:[
                {required:true,message:'角色名称必须输入'}
              ]
            })(<Input placeholder='请输入角色名称'/>)
          }
        </Item>
      </Form>
    )
  }
}
export default AddForm