import s from './Loading.module.scss';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
  return (
    <div className={s.root}>
      <LoadingOutlined />
    </div>
  )
}

export default Loading;