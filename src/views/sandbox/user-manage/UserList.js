import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Modal, Switch } from 'antd'
import axios from 'axios'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import UserForm from '../../../components/user-manage/UserForm';
const { confirm } = Modal;


export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false)
  const addForm = useRef(null)
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button type="primary" shape='circle' icon={<EditOutlined />} ></Button>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => showConfirm(item)}></Button>
        </div>
      }
    },
  ]

  useEffect(() => {
    axios.get('http://localhost:8000/users?_expand=role').then(res => {
      setDataSource(res.data)
    })
  }, [])

  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/regions').then(res => {
      setregionList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/roles').then(res => {
      setroleList(res.data)
    })
  }, [])


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
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:8000/users/${item.id}`)
  }

  const addFormOk = () => {
    addForm.current.validateFields().then(value => {
      setOpen(false)
      addForm.current.resetFields()
      axios.post(`http://localhost:8000/users`, {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        console.log(res.data)
        setDataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === res.data.roleId)[0]
        }])
      })

    }).catch(err => {
      console.log(err)
    })

  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={(item) => item.id}></Table>

      <Modal
        open={open}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => setOpen(false)}
        onOk={() => addFormOk()}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
      </Modal>
    </div>
  )
}
