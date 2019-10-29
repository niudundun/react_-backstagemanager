import React, { Component } from 'react'
import { Card, Select, Icon, Button, Input, Table, message } from "antd";

import { reqGetProducts, reqSearchProducts, reqUapdateProductStatus } from "../../api";
import { PAGE_SIZE } from "../../config";
import memoryUtils from "../../utils/memory";

const { Option } = Select

export default class List extends Component {

  state = {
    products: [],
    total: 0,
    searchType: 'productName', //只能写productName/productDesc
    searchName: ''
  }

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      render: (price) => '¥' + price
    },
    {
      width: 100,
      title: '状态',
      // dataIndex: 'status',// 1 在售 2 下架
      render: ({ _id, status }) => {
        let btnText = '下架' //默认status为1
        let text = '在售'  
        if(status === 2){
          btnText = '上架'
          text = '已下架'
        }
        return (
          <span>
            <Button 
            type="primary"
            onClick = {() => this.updateStatus(_id,status === 1 ? 2 : 1)}
            >{btnText}</Button>
            <span>{text}</span>
          </span>
        )
      }
    },
    {
      width: 100,
      title: '操作',
      render: (product) => (
        <span>
          <Button type='link' onClick={()=>{
            memoryUtils.product = product
            this.props.history.push(`/product/detail/${product._id}`)
          }}>详情</Button>
          <Button type='link' onClick={()=>{
            memoryUtils.product = product
            this.props.history.push(`/product/addupdate`)
          }}>修改</Button>
        </span>
      )
    }
  ]

  //异步获取指定页码商品列表
  getProducts = async (pageNum) => {
    let result
    if (this.isSearch) { //搜索分页请求
      const { searchType, searchName } = this.state
      if (!searchName) return
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
      this.isSearch = false
    } else { //一般分页请求
      result = await reqGetProducts(pageNum, PAGE_SIZE)
    }

    if (result.status === 0) {
      const { list, total } = result.data
      this.setState({
        products: list,
        total
      })
    }
  }

  //更新商品状态
  updateStatus = async (id,status) => {
    const result = await reqUapdateProductStatus(id,status)
    if(result.status === 0){
      message.success('更新状态成功')
      let products = this.state.products
      products = products.map( item=> {
        if(item._id === id) return {...item,status}
        else return item
      })
      this.setState({products})
    }
    else message.error(result.msg)
  }


  componentDidMount() {
    this.getProducts(1) //需要指定页码
  }

  render() {

    const { products, total, searchType, searchName } = this.state

    const title = (
      <span>
        <Select
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}
        >
          {/*select不加value显示不了内容  option 不加value会报错 */}
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 200, margin: '0 10px' }}
          placeholder="关键字"
          value={searchName}
          onChange={e => this.setState({ searchName: e.target.value })}
        />
        <Button
          type="primary"
          onClick={
            () => {
              //标识搜索获取列表还是一般获取列表
              this.isSearch = true
              this.getProducts(1)
            }
          }
        >搜索</Button>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={() => {
        memoryUtils.product = {} //清空之前的
        this.props.history.push('/product/addupdate')
      }}>
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={products}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{
            pageSize: PAGE_SIZE,
            total,
            // onChange:(page)=>{this.getProducts(page)}
            onChange: this.getProducts //当改变时就会调用该函数
          }}
        />
      </Card>
    )
  }
}
