import React, { Component } from 'react'
import { Card, Icon, Button, Table, Modal, message } from 'antd';


import LinkButton from "../../components/link-button";
import { reqCategorys } from "../../api";

const columns = [
  {
    title: '分类',
    dataIndex: 'name',
  },
  {
    width: 300,
    title: '操作',
    render: () => <LinkButton>修改分类</LinkButton>
  },
]

export default class Category extends Component {
  state = {
    categorys:[],
    loading:false
  }

  getCategorys = async() => {
    this.setState({loading:true})
    const result = await reqCategorys()
    this.setState({loading:false})
    if(result.status ===0){
      const categorys = result.data
      this.setState({categorys:result.data})
    }else{
      message.error('resule.msg')
    }

  }

  componentDidMount(){
    this.getCategorys()
  }

  render() {
    const extra = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )
    const {loading,categorys} = this.state
    return (
      <div>
        <Card extra={extra} >
          <Table
            bordered
            loading={loading}
            dataSource={categorys}
            columns={columns}
            pagination = {{pageSize:5,showQuickJumper:true}}
          />
        </Card>
      </div>
    )
  }
}
