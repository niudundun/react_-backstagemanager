import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, message } from "antd";
import dayjs from "dayjs";
import { connect } from 'react-redux';

import { getRolesAsync, addRoleAsync, updateRoleAsync } from "../../redux/action_creators/roles";
import AddForm from "./add-form";
import Auth from "./auth";

@connect(state => ({ roles: state.roles,username:state.user.user.username }), { getRolesAsync, addRoleAsync, updateRoleAsync })
@Form.create()
class Role extends Component {
  state = {
    isShowAdd: false,
    isShowUpdate:false
  }

  authRef = React.createRef()

  columns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (create_time) => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: (auth_time) => dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    },
    {
      title: '操作',
      //这里传 role 是为了将 role 存出去
      render: (role) => <Button type="link" onClick={() => this.showAuth(role)}>设置权限</Button>
    }
  ]

  addRole = () => {
    this.form.validateFields(async(err,values)=>{
      if(!err){
        const msg = await this.props.addRoleAsync(values.roleName)
        this.form.resetFields()
        if(msg) message.error(msg)
        else{
          this.setState({
            isShowAdd:false
          })
          message.success('添加角色成功，请授权')
        }
      }
    })
  }

  updateRole = async() => {
    const role = this.role
    role.menus = this.authRef.current.getMenus()
    role.auth_name = this.props.username
    role.auth_time = Date.now()
    const msg = await this.props.updateRoleAsync(role)
    if(msg) message.error(msg)
    else {
      this.setState({ isShowUpdate:false })
      message.success('授权成功')
    }
  }

  showAuth = (role) => {
    this.role = role
    this.setState({ isShowUpdate:true })
  }

  hideAdd = () => {
    this.form.resetFields()
    this.setState({
      isShowAdd: false
    })
  }

  hideUpdate = () => {
    this.setState({ isShowUpdate:false })
  }


  componentDidMount() {
    this.props.getRolesAsync()
  }

  render() {
    const title = <Button type="primary" onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>
    const { roles } = this.props
    const {isShowAdd,isShowUpdate} = this.state
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.hideAdd}
        >
          <AddForm setForm={(form) => this.form = form }/>
        </Modal>
        <Modal
          title="角色权限"
          visible={isShowUpdate}
          onOk={this.updateRole}
          onCancel={this.hideUpdate}
        >
          <Auth role={this.role || {}} ref={this.authRef}/>
        </Modal>
      </Card>
    )
  }
}
export default Role