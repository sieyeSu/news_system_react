import React from 'react'
import { Button } from 'antd'
// import axios from 'axios'
export default function Home() {
  const ajax = () => {
    //ȡ get
    // axios.get('http://localhost:8000/posts').then(res => console.log(res.data))
    //�� post
    // axios.post('http://localhost:8000/posts', {
    //   title: 'ss3'
    // })
    //�� put
    // axios.put('http://localhost:8000/posts/2', {
    //   title: 'newtitle'
    // })
    //�ֲ����� patch
    // axios.patch('http://localhost:8000/posts/2', {
    //   title: 'patchtitle'
    // })
    //ɾ�� delete
    // axios.delete('http://localhost:8000/posts/2')
    //embed ����      expand ����
  }
  return (
    <div>
      <Button type='primary' onClick={ajax}>button</Button>
    </div>
  )
}
