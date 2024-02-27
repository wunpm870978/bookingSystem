import React, {
  cloneElement,
  useRef,
  useCallback,
  useState,
  useEffect,
  useId,
} from 'react';
import s from './SubMenu.module.scss';
import { DownOutlined } from '@ant-design/icons';

const SubMenu = ({
  selectedValue = null,
  content: Content,
  itemOnClick = () => { },
  children
}) => {
  const containerRef = useRef(null);
  const defaultItemRef = useRef(null);
  const childrenRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(true);

  const handleOnCollapse = useCallback(() => {
    let height = 0;
    height = isCollapse
      ? childrenRef.current.offsetHeight + defaultItemRef.current.offsetHeight
      : defaultItemRef.current.offsetHeight;
    containerRef.current.style.maxHeight = `${height}px`;
    setIsCollapse(prev => !prev);
  }, [isCollapse])

  useEffect(() => {
    if (containerRef.current && defaultItemRef.current) {
      containerRef.current.style.maxHeight = `${defaultItemRef.current.offsetHeight}px`;
    }
  }, [])

  return (
    <div ref={containerRef} className={s.root}>
      <div ref={defaultItemRef} className={s.itemContainer} onClick={handleOnCollapse}>
        <div className={s.content}>
          {Content}
        </div>
        <DownOutlined className={s.icon} />
      </div>
      <div ref={childrenRef} className={s.subLayer}>
        {React.Children.map(children, (child) => {
          const displayName = child.type.displayName;
          if (displayName === "MenuItem") {
            return cloneElement(child, {
              selectedValue,
              itemOnClick,
            });
          } else {
            return null;
          }
        })}
      </div>
    </div>
  )
}

SubMenu.displayName = "SubMenu";
export default SubMenu;