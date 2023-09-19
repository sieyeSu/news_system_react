import React, { forwardRef, useState } from 'react'
import { Form, Input, Select } from 'antd'
const UserForm = forwardRef((props, ref) => {
    const [isDisabled, setisDisabled] = useState(false)
    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled ? [] : [
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Select
                    disabled={isDisabled}
                    options={
                        props.regionList.map(item => {
                            return {
                                value: item.value,
                                label: item.title
                            }
                        })
                    }
                />
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}
            >
                <Select
                    onChange={(value) => {
                        if (value === 1) {
                            setisDisabled(true)
                            ref.current.setFieldsValue({
                                region: ""
                            })
                        }
                        else setisDisabled(false)
                    }}
                    options={
                        props.roleList.map(item => {
                            return {
                                value: item.id,
                                label: item.roleName
                            }
                        })
                    }
                />
            </Form.Item>
        </Form>
    )
})
export default UserForm;