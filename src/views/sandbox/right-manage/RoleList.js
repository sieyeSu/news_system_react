import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import axios from 'axios'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';

const { confirm } = Modal;
export default function RoleList() {

  const [dataSource, setDataSource] = useState([]);
  const [rightList, setrightList] = useState([]);
  const [currentRight, setcurrentRights] = useState([]);
  const [currentId, setcurrentId] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button type="primary" shape='circle' icon={<EditOutlined />} onClick={() => {
            setIsModalOpen(true)
            setcurrentRights(item.rights)
            setcurrentId(item.id)
          }} ></Button>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => showConfirm(item)}></Button>
        </div>
      }
    },
  ]
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then(res => {
      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then(res => {
      setrightList(res.data)
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
    axios.delete(`http://localhost:8000/roles/${item.id}`)
  }

  const handleOk = () => {
    setIsModalOpen(false);
    //同步data
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRight
        }
      }
      return item
    }))

    axios.patch(`http://localhost:8000/roles/${currentId}`, {
      rights: currentRight
    })

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCheck = (checkedKeys) => {
    setcurrentRights(checkedKeys.checked)
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}></Table>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          treeData={rightList}
          checkedKeys={currentRight}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>
    </div>
  )
}
