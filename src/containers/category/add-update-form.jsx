import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Form,Input } from "antd";

const {Item} = Form

@Form.create()
 class AddUpdateForm extends Component {

  static propTypes = { // 对props中的属性值进行限制
    setForm:PropTypes.func.isRequired,
    categoryName:PropTypes.string//非必须，添加分类没有
  }
  constructor (props){
    super(props)
    // 调用标签传过来的函数将form传过去
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue:this.props.categoryName || '',
              rules:[
                {required:true, message:'分类名称必须输入'}
              ]
            })( <Input placeholder="请输入分类名称"/> )
          }
        </Item>
      </Form>
    )
  }
}
export default AddUpdateForm
