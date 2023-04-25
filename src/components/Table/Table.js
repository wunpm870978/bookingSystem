import React from "react";
import { Table, ConfigProvider } from 'antd';
import CustomEmpty from "components/Empty/Empty";

const CustomTable = ({ columns, dataSource, rowKey, emptyDescription = 'No data...' }) => {
    return (
        <ConfigProvider renderEmpty={() => <CustomEmpty description={emptyDescription} />}>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey={record => record[rowKey]}
            />
        </ConfigProvider>
    )
}
export default CustomTable;