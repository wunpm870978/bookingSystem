import React, {
  cloneElement,
  useRef,
  useCallback,
  useState,
  useEffect,
  useId,
  ReactNode,
  FC,
  isValidElement,
} from 'react';
import s from './SubMenu.module.scss';
import { DownOutlined } from '@ant-design/icons';

export interface SubMenuProps {
  selectedValue: string,
  content: ReactNode,
  itemOnClick: (value: string) => void,
  children: ReactNode,
}

const SubMenu: FC<SubMenuProps> = ({
  selectedValue,
  content: Content,
  itemOnClick,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultItemRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = useState<boolean>(true);

  const handleOnCollapse = useCallback(() => {
    if (childrenRef.current && defaultItemRef.current && containerRef.current) {
      let height = 0;
      height = isCollapse
        ? childrenRef.current.offsetHeight + defaultItemRef.current.offsetHeight
        : defaultItemRef.current.offsetHeight;
      containerRef.current.style.maxHeight = `${height}px`;
      setIsCollapse(prev => !prev);
    }
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
        {React.Children
          .map(children, (child: any) => {
            if (!child || !child.displayName || child.displayName !== "MenuItem") return null;
            return cloneElement(child, {
              selectedValue,
              itemOnClick,
            });
          })
        }
      </div>
    </div>
  )
}

SubMenu.displayName = "SubMenu";
export default SubMenu;