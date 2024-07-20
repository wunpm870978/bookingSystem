import React, { FC } from "react";
import s from './Test.module.scss';

const Test: FC = () => {
  // const [temp, setTemp] = useState('temp')
  // const asd = {};
  console.log('Test rerender')

  return (
    <div className={s.root}>
      hello world
    </div>
  )
}

export default Test;