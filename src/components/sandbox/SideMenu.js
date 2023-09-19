import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {
    // UploadOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../sandbox/index.css'
import axios from 'axios';
const { Sider } = Layout;

//iconlist
const iconList = {
    "/home": <AppstoreOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />,
    // "/publish-manage": <UploadOutlined />
}

function getItem(key, label, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

function SideMenu(props) {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then(res => {
            setMenu(res.data)
        }).catch(err => console.log(err))

    }, [])

    const [collapsed] = useState(false);
    const checkPagePermisson = (item) => {
        return item.pagepermisson === 1;
    }
    //迭代动态创建列�?
    const renderMenu = (menuList) => {
        return menuList.map(item => {
            if (item.children?.length > 0 && checkPagePermisson(item)) {
                return getItem(item.key, item.title, iconList[item.key], renderMenu(item.children), item.type)
            }
            return checkPagePermisson(item) && getItem(item.key, item.title, iconList[item.key], item.type)
        })
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
                <div className="demo-logo-vertical">全球新闻发布管理系统</div>
                <div style={{ flex: 1, overflow: "auto" }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultOpenKeys={["/" + props.location.pathname.split("/")[1]]}
                        selectedKeys={[props.location.pathname]}
                        items={
                            renderMenu(menu)
                        }
                        onClick={(item) => { props.history.push(item.key) }}
                    ></Menu>
                </div>

            </div>

        </Sider>
    )

}
export default withRouter(SideMenu)