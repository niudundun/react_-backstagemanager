import React, { Component } from 'react'
import {
  Card,
  Icon,
  Button,
  Table,
  Modal,
  message
} from 'antd';
import { connect } from 'react-redux';

import { getCategorysAsync, addCategoryAsync, updateCategoryAsync } from "../../redux/action_creators/categorys";
import LinkButton from "../../components/link-button";
import AddUpdateForm from "./add-update-form";





@connect(
  state => ({ categorys: state.categorys }),
  { getCategorysAsync, addCategoryAsync, updateCategoryAsync }
)
class Category extends Component {
  state = {
    loading: false,
    isShowAdd: false,//添加
    isShowUpdate: false,//修改分类
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '操作',
      render: (category) => <LinkButton onClick={() => { this.showUpdate(category) }}>修改分类</LinkButton>
    }
  ]

  //获取分类
  getCategorys = async () => {
    this.setState({ loading: true })

    const msg = await this.props.getCategorysAsync()
    this.setState({ loading: false })
    if (msg) return message.error(msg)
  }
  //添加商品分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values
        const msg = await this.props.addCategoryAsync(categoryName)
        this.form.resetFields()//重置输入框至初始值
        if(msg) return message.error(msg)
        else{
          this.setState({
            isShowAdd: false
          })
          message.success('添加分类成功')
        }

        //发送添加分类请求
       /*  const result = await reqAddCategory(categoryName)
        this.form.resetFields()//重置输入框至初始值
        if (result.status === 0) { //成功的话更新categorys
          const category = result.data
          const categorys = this.state.categorys
          this.setState({
            //不能直接修改 categorys
            categorys: [category, ...categorys],
            isShowAdd: false
          })
          message.success('添加分类成功')
        } else {
          message.error(result.msg)
        } */

      }
    })
  }
  //隐藏添加modal
  CancelAdd = () => {
    this.form.resetFields()
    this.setState({ isShowAdd: false })
  }

  //显示更新的modal 且存下当前行数据的值
  showUpdate = (category) => {
    this.category = category
    this.setState({
      isShowUpdate: true
    })
  }

  //更新商品分类
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values
        const categoryId = this.category._id
        const msg = await this.props.updateCategoryAsync({categoryId,categoryName})
        this.form.resetFields()
        if (msg) {
          // 更新失败, 显示提示
          message.error(msg)
        } else {
          this.setState({
            isShowUpdate: false
          })
          message.success('更新分类成功')
        }


        //发送更新分类请求 传入原本数据的ID 和 新改的名字
       /*  const result = await reqUpdateCategory({ categoryId, categoryName })
        this.form.resetFields()//重置输入框至初始值
        if (result.status === 0) { //成功的话更新categorys
          const category = { _id: categoryId, name: categoryName }
          const categorys = this.state.categorys
          this.setState({
            //不能直接修改 categorys
            categorys: categorys.map(item => {
              if (item._id === category._id) {
                return category
              } else {
                return item
              }
            }),
            isShowUpdate: false
          })
          message.success('更新分类成功')
        } else {
          message.error(result.msg)
        } */
      }
    })
  }
  //隐藏更新modal
  CancelUpdate = () => {
    delete this.category
    this.form.resetFields()
    this.setState({ isShowUpdate: false })
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {
    const { loading, isShowAdd, isShowUpdate } = this.state
    const { categorys } = this.props
    //这里不能直接取this.category.name 因为在render时并没有点击修改分类，所以取不到
    const category = this.category || {} // 在没有指定修改的分类前, 默认是一个{}
    const extra = (
      <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <Card extra={extra} >
        <Table bordered
          loading={loading}
          dataSource={categorys}
          columns={this.columns}
          rowKey='_id'
          pagination={{ pageSize: 5, showQuickJumper: true }} />

        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.CancelAdd}
        >
          <AddUpdateForm setForm={(form) => { this.form = form }} />
        </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.CancelUpdate}
        >
          <AddUpdateForm setForm={(form) => { this.form = form }} categoryName={category.name} />
        </Modal>
      </Card>
    )
  }
}

export default Category