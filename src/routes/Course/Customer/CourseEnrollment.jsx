import React, { useState } from "react";
import s from './CourseEnrollment.module.scss';
import { Segmented, Input, Select } from 'antd';
import { AppstoreOutlined, BarsOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Search } = Input;
const FAKE_OPTIONS = [
  {
      label: `空中瑜伽`,
      value: 'air',
  },
  {
      label: `地面瑜伽`,
      value: 'ground',
  },
  {
      label: `雙人瑜伽`,
      value: 'double',
  },
  {
      label: `單人瑜伽`,
      value: 'single',
  },
  {
      label: `爆旋陀螺`,
      value: 'rolling',
  },
]
const CourseEnrollment = () => {
    const [itemFormat, setItemFormat] = useState('list');
    const [filterList, setFilterList] = useState([]);
    const { t } = useTranslation();

    const onSearch = (value) => console.log(value);


    return <div className={s.root}>
        <div className={s.optionsWrapper}>
            <Segmented
                value={itemFormat}
                onChange={(value) => setItemFormat(value)}
                options={[
                    {
                        value: 'list',
                        icon: <BarsOutlined />,
                    },
                    {
                        value: 'grid',
                        icon: <AppstoreOutlined />,
                    },
                ]}
            />
            <Search placeholder={t('course.search_placetext')} allowClear onSearch={onSearch} style={{ width: 300 }} />
            <div style={{ display: 'flex', columnGap: '5px' }}>
                <FilterOutlined />
                <Select
                    value={filterList}
                    onChange={(value) => setFilterList(value)}
                    placeholder={t('general.filter')}
                    options={FAKE_OPTIONS}
                    maxTagCount={'responsive'}
                    mode={'multiple'}
                    style={{
                        width: '300px',
                    }}
                />
            </div>
        </div>
    </div>
}

export default CourseEnrollment;