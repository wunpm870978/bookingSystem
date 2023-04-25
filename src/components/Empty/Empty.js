import { Empty, Button } from 'antd';

const CustomEmpty = ({ description }) => {
    return (
        <Empty
            // image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
                <span>
                    {description}
                </span>
            }
        >
            <Button type="primary">Create Now</Button>
        </Empty>
    )
}
export default CustomEmpty;