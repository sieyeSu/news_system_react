import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader';
import Home from './home/Home'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import UserList from './user-manage/UserList'
import { Redirect, Route, Switch } from 'react-router-dom';
import NoPermission from './nopermission/NoPermission';
import { Layout, theme } from 'antd';
const { Content } = Layout;

export default function NewsSandBox() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout>
                <TopHeader></TopHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >

                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/user-manage/list" component={UserList} />
                        <Route path="/right-manage/role/list" component={RoleList} />
                        <Route path="/right-manage/right/list" component={RightList} />
                        <Redirect from='/' to='/home' exact />
                        <Route path="*" component={NoPermission} />
                    </Switch>
                </Content>

            </Layout>
        </Layout>
    )

}
