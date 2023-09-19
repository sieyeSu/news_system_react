import React from 'react'
import { Button } from 'antd'
// import axios from 'axios'
export default function Home() {
  const ajax = () => {
    //取 get
    // axios.get('http://localhost:8000/posts').then(res => console.log(res.data))
    //增 post
    // axios.post('http://localhost:8000/posts', {
    //   title: 'ss3'
    // })
    //改 put
    // axios.put('http://localhost:8000/posts/2', {
    //   title: 'newtitle'
    // })
    //局部更新 patch
    // axios.patch('http://localhost:8000/posts/2', {
    //   title: 'patchtitle'
    // })
    //删除 delete
    // axios.delete('http://localhost:8000/posts/2')
    //embed 联结      expand 关联
  }
  return (
    <div>
      <Button type='primary' onClick={ajax}>button</Button>
    </div>
  )
}
