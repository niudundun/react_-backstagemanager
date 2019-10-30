import React, { Component } from 'react'
import { Card, Button, Table, Modal } from "antd";
import { connect } from "react-redux";
import dayjs from "dayjs";

import { PAGE_SIZE } from "../../config";
import AddUpdate from "./add-update-form";
import { getRolesAsync } from "../../redux/action_creators/roles";
import { reqGetUsers,reqAddUpdateUser,reqDeletUser } from "../../api";

@connect(state=>({roles:state.roles}),{getRolesAsync})
class User extends Component {
  state = {
    users:[],
    isShow:false
  }

  columns = [
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      render: role_id => {
        const role = this.props.roles.find(role => role._id===role_id)
        return role && role.name
      }
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          <Button type="link" onClick={() => this.showUpdate(user)}>修改</Button>
          &nbsp;&nbsp;
          <Button type="link" onClick={() => this.clickDelete(user)}>删除</Button>
        </span>
      )
    },
  ]

  getUsers = async () => {
    const result = await reqGetUsers()
    if (result.status === 0) {
      const { users } = result.data
      this.setState({
        users
      })
    }
  }

  showUpdate = (user) => {
    this.user = user
    this.setState({isShow:true})
  }

  AddUpdateUser = async() => {
    const user = this.form.getFieldsValue() //从表单处获得role_id
    this.form.resetFields()
    if(this.user){
      user._id = this.user._id
    }
    this.setState({ isShow:false })

    const result = await reqAddUpdateUser(user)
    if(result.status === 0 ) this.getUsers()

  }

  showAddUser = () => {
    this.user = null
    this.setState({isShow:true})
  }

  clickDelete = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗？`,
      onOk: async () => {
        const result = await reqDeletUser(user._id)
        if (result.status === 0) this.getUsers()
      }
    })
  }

  componentDidMount(){
    this.getUsers()
    this.props.getRolesAsync()
  }

  render() {
    const title = <Button type="primary" onClick={this.showAddUser}>创建用户</Button>
    const { users, isShow } = this.state
    const {roles} = this.props
    const user = this.user || {}

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        >
        </Table>
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onCancel={() => this.setState({ isShow: false })}
          onOk={this.AddUpdateUser}
        >
          <AddUpdate setForm={(form) => this.form = form} user={user} roles={roles} />
        </Modal>
      </Card>
    )
  }
}
export default User
