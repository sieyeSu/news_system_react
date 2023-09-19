import React, { useEffect, useState } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import axios from 'axios'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
const { confirm } = Modal;

export default function RightList() {
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then(res => {
      const list = res.data
      list.forEach(item => {
        if (item.children.length === 0) {
          item.children = ""
        }
      });
      setDataSource(list)

    })
  }, [])
  const [dataSource, setDataSource] = useState([])

  const showConfirm = (item) => {
    confirm({
      title: '确定删除？',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteMethod(item)
      },
      onCancel() {

      },
    });
  };

  const deleteMethod = (item) => {
    //二级需要判断
    if (item.grade === 1) {
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:8000/rights/${item.id}`)
    }
    else {
      //filter浅拷贝只复制第一层不改变，第二层会有影响，此时datasource已经改变但没有触发渲染
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setDataSource([...dataSource])
      axios.delete(`http://localhost:8000/children/${item.id}`)
    }

  }
  //pagepermission改变，刷新重绘
  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setDataSource([...dataSource])
    if (item.grade === 1) {
      axios.patch(`http://localhost:8000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
    else {
      axios.patch(`http://localhost:8000/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Popover content={
            <div style={{ textAlign: "center" }}>
              <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
            </div>
          } title="页面配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
            <Button type="primary" shape='circle' icon={<EditOutlined />} disabled={item.pagepermisson === undefined}></Button>
          </Popover>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => showConfirm(item)}></Button>
        </div>
      }
    },
  ];



  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={(item) => item.id} />;
    </div>
  )
}
