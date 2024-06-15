import React, { useState } from "react";
import { Space, Tag, Button, Input, Drawer } from 'antd';
import s from './CourseTable.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import CustomTable from "components/Table/Table";
const FAKE_COURSE_INFO = [
  {
      course_id: '1',
      course_name: 'SLIMMING FLOW(VINYASA)',
      image: '',
      tags: ['減肥', '排毒'],
      course_type: 'a',
  },
  {
      course_id: '2',
      course_name: 'RELAXING STRETCHING YOGA',
      image: '',
      tags: ['減壓', '伸展'],
      course_type: 'b',
  },
  {
      course_id: '3',
      course_name: 'AROMA STRETCHING YOGA',
      image: '',
      tags: ['減肥', '排毒'],
      course_type: 'c',
  },
  {
      course_id: '4',
      course_name: 'HOT FLOW',
      image: '',
      tags: ['高溫', '排毒'],
      course_type: 'd',
  },
  {
      course_id: '5',
      course_name: 'HOT HATHA YOGA ',
      image: '',
      tags: ['高溫'],
      course_type: 'd',
  },

  {
      course_id: '6',
      course_name: 'WARM STRETCHING YOGA',
      image: '',
      tags: ['伸展'],
      course_type: 'e',
  },
  {
      course_id: '7',
      course_name: 'LOWER BODY STRETCH',
      image: '',
      tags: ['伸展'],
      course_type: 'e',
  },
  {
      course_id: '8',
      course_name: 'HEART OPENING FLOW',
      image: '',
      tags: ['開胸流','伸展'],
      course_type: 'e',
  },
  {
      course_id: '9',
      course_name: 'BACK CARE YOGA',
      image: '',
      tags: ['伸展'],
      course_type: 'e',
  },
  {
      course_id: '10',
      course_name: 'CORE YOGA',
      image: '',
      tags: ['核心'],
      course_type: 'e',
  },
  {
      course_id: '11',
      course_name: 'CORE FLOW YOGA',
      image: '',
      tags: ['核心'],
      course_type: 'e',
  },
  {
      course_id: '12',
      course_name: 'POWER VINYASA',
      image: '',
      tags: ['力量'],
      course_type: 'e',
  },
  {
      course_id: '13',
      course_name: 'WALL ROPE YOGA',
      image: '',
      tags: ['牆繩'],
      course_type: 'f',
  },
  {
      course_id: '14',
      course_name: 'AERIAL YOGA',
      image: '',
      tags: ['空中'],
      course_type: 'e',
  },
]
const CourseTable = () => {
    const [detailedPageShow, setDetailedPageShow] = useState(false);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img
                src={text}
                alt=""
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />,
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
            render: (text) => <p>{text}</p>,
            onFilter: (value, record) =>
                record['course_name'].toString().toLowerCase().includes(value.toLowerCase()),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
                <div
                    style={{
                        display: 'block',
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        allowClear
                        placeholder={`Search`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{
                            marginBottom: 8,
                            maxWidth: '150px'
                        }}
                    />
                    <Button
                        style={{ display: 'block', marginLeft: 'auto' }}
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                        }}
                    >
                        Filter
                    </Button>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{
                        color: filtered ? '#1890ff' : undefined,
                    }}
                />
            ),
        },
        {
            title: 'Course Type',
            dataIndex: 'course_type',
            key: 'course_type',
            filters: FAKE_COURSE_INFO
                .filter((obj, index) => FAKE_COURSE_INFO.findIndex(item => item.course_type === obj.course_type) === index)
                .map(item => ({ text: item.course_type, value: item.course_type })),
            onFilter: (value, record) => record.course_type.indexOf(value) === 0,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Edit {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <div className={s.root}>
            <div className={s.btnsWrapper}>
                <Button onClick={() => setDetailedPageShow(true)}>
                    Create
                </Button>
                <Button>
                    Upload excel
                </Button>
            </div>
            <Drawer
                title="Create a new course"
                width={'80%'}
                onClose={() => setDetailedPageShow(false)}
                open={detailedPageShow}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={() => setDetailedPageShow(false)}>Cancel</Button>
                        <Button onClick={() => setDetailedPageShow(false)} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >

            </Drawer>
            <CustomTable
                columns={columns}
                dataSource={FAKE_COURSE_INFO}
                // dataSource={[]}
                rowKey={'course_id'}
            />
        </div>
    )
}

export default CourseTable;
