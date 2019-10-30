import React, { Component } from 'react'
import { Form,Input,Tree } from 'antd'
import PropTypes from "prop-types";

import menuList from "../../config/menu-config";

const { Item } = Form
const {TreeNode} = Tree

export default class Auth extends Component {

  static propTypes = {
    role:PropTypes.object
  }

  state = {
    checkedKeys: this.props.role.menus || []
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      checkedKeys:nextProps.role.menus
    })
  }

  onCheck = (checkedKeys) => { //参数为所有勾选key的数组
    this.setState({ checkedKeys })
  }

  getMenus = () => this.state.checkedKeys

  renderTreeNodes = data => {
    return data.reduce((pre,item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
            {item.children? this.renderTreeNodes(item.children) : null }
          </TreeNode>
      )
      return pre
    },[])
  }



  render() {
    const { roleName } = this.props.role
    const { checkedKeys } = this.state
    const formLayout = {
      labelCol : { span : 4 },
      wrapperCol : { span : 12 }
    }
    return (
      <div>
        <Item label="角色名称" {...formLayout}>
         <Input placeholder="请输入角色名称" value={roleName} disabled/>
        </Item>
        <Tree
          checkable //是否可勾选
          defaultExpandAll // 默认都展开
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}//已勾选的
        >  
          <TreeNode title="平台权限" key="xxx" >
            {this.renderTreeNodes(menuList)}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
