import React, { useState } from "react";
import {
    Badge, Dropdown, Space, Table,
    Button, Drawer, Form, Input,
    Select, TimePicker
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import s from './ShopTable.module.scss'
import i18n from "i18next";
const { RangePicker } = TimePicker;


const ShopProfile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState();
    const items = [
        {
            key: '1',
            label: 'Action 1',
        },
        {
            key: '2',
            label: 'Action 2',
        },
    ];

    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Status',
                key: 'state',
                render: () => <Badge status="success" text="Finished" />,
            },
            {
                title: 'Upgrade Status',
                dataIndex: 'upgradeNum',
                key: 'upgradeNum',
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                        <a>Pause</a>
                        <a>Stop</a>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a>
                                More <DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                ),
            },
        ];
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: 'Version',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: 'Upgraded',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            key: 'operation',
            render: () => <a>Publish</a>,
        },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            name: 'Screen',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
    }
    return (
        <React.Fragment>
            <div className={s.btnWrapper}>
                <Button onClick={() => setIsDrawerOpen(true)}>
                    Create
                </Button>
            </div>
            <div >
                shopanme
            </div>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={data}
            />
            <Drawer
                title="Create a new account"
                width={720}
                placement='right'
                onClose={() => setIsDrawerOpen(false)}
                open={isDrawerOpen}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={() => { }}>Cancel</Button>
                        <Button onClick={() => { }} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form
                    name="wrap"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                    labelWrap
                    colon={false}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label={`${i18n.t('shop.district')}:`}
                        name="district"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    label: i18n.t('hkarea.HK'),
                                    options: [
                                        {
                                            label: i18n.t('hkarea.CnW'),
                                            value: 'CnW',
                                        },
                                        {
                                            label: i18n.t('hkarea.WC'),
                                            value: 'WC',
                                        },
                                        {
                                            label: i18n.t('hkarea.E'),
                                            value: 'E',
                                        },
                                        {
                                            label: i18n.t('hkarea.S'),
                                            value: 'S',
                                        },
                                    ],
                                },
                                {
                                    label: i18n.t('hkarea.KLN'),
                                    options: [
                                        {
                                            label: i18n.t('hkarea.YTM'),
                                            value: 'YTM',
                                        },
                                        {
                                            label: i18n.t('hkarea.SSP'),
                                            value: 'SSP',
                                        },
                                        {
                                            label: i18n.t('hkarea.KLN_CITY'),
                                            value: 'KLN_CITY',
                                        },
                                        {
                                            label: i18n.t('hkarea.WTS'),
                                            value: 'WTS',
                                        },
                                        {
                                            label: i18n.t('hkarea.KT'),
                                            value: 'KT',
                                        },
                                    ],
                                },
                                {
                                    label: i18n.t('hkarea.NT'),
                                    options: [
                                        {
                                            label: i18n.t('hkarea.NT_KT'),
                                            value: 'NT_KT',
                                        },
                                        {
                                            label: i18n.t('hkarea.TW'),
                                            value: 'TW',
                                        },
                                        {
                                            label: i18n.t('hkarea.TM'),
                                            value: 'TM',
                                        },
                                        {
                                            label: i18n.t('hkarea.YL'),
                                            value: 'YL',
                                        },
                                        {
                                            label: i18n.t('hkarea.N'),
                                            value: 'N',
                                        },
                                        {
                                            label: i18n.t('hkarea.TP'),
                                            value: 'TP',
                                        },
                                        {
                                            label: i18n.t('hkarea.ST'),
                                            value: 'ST',
                                        },
                                        {
                                            label: i18n.t('hkarea.SK'),
                                            value: 'SK',
                                        },
                                        {
                                            label: i18n.t('hkarea.I'),
                                            value: 'I',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label={`${i18n.t('shop.address')}:`}
                        name="address"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={`${i18n.t('shop.business_hours')}:`}
                        name="business_hours"
                    >
                        <RangePicker
                            placeholder={[
                                i18n.t('shop.start_time'),
                                i18n.t('shop.end_time')
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </React.Fragment>
    )
}

export default ShopProfile;