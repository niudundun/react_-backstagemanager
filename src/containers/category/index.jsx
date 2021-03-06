import React, { Component,userState,useEffect,useRef } from 'react'
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


function Category(props) {
  const [loading,setLoading] = useState(false)
  const [isShowAdd,setShowAdd] = useState(false)
  const [isShowUpdate,setShouUpdate] = useState(false)

  const formRef = useRef(null)

  const columnsRef = userRef(
    [
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
  )
  
  useEffect(() => {
      this.getCategorys()
  }, [])

  async function getCategorys() {
    setLoading(true)
    const msg = await props.getCategorysAsync()
    setLoading(false)
    if (msg) return message.error(msg)
   }



}



class Category extends Component {
  

  //获取分类
 
  //添加商品分类li988i
  addCategory = () => {
    formRef.current.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values
        const msg = await this.props.addCategoryAsync(categoryName)
        this.form.resetFields()//重置输入框至初始值
        if(msg) return message.error(msg)
        else{
          setShowAdd(false)
          message.success('添加分类成功')
        }
      }
    })
  }
  //隐藏添加modal
  CancelAdd = () => {
    this.form.resetFields()
    setShowAdd({ isShowAdd: false)
  }

  //显示更新的modal 且存下当前行数据的值
  showUpdate = (category) => {
    this.category = category
    setShouUpdate(true)
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
          setShouUpdate(false)
          message.success('更新分类成功')
        }
      }
    })
  }
  //隐藏更新modal
  CancelUpdate = () => {
    delete this.category
    this.form.resetFields()
    setShouUpdate(false)
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
          columns={columnsRef.current}
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

export default connect(
  state => ({ categorys: state.categorys }),
  { getCategorysAsync, addCategoryAsync, updateCategoryAsync }
)()