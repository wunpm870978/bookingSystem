import React, { useEffect, useRef, useState } from 'react';
import Content from './Components/Content';

const CustomTooltip = ({
  // isOpen = false,
  // onClose = () => { },
  /**
   * position
   * 1) top
   * 2) bottom
   * 3) left
   * 4) right
   * 5) topleft
   */
  position = 'left',
  children,
  content,
}) => {
  const targetRef = useRef(null);
  const [isContentShow, setIsContentShow] = useState(false);

  const onHover = () => {
    setIsContentShow(true);
  };

  const onLeave = () => {
    setIsContentShow(false);
  };

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener('mouseover', onHover);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener('mouseover', onHover);
      }
    };
  }, []);

  if (children.length > 1) return false;
  return (
    <React.Fragment>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { ref: (ref) => (targetRef.current = ref) })
      )}
      <Content
        isOpen={isContentShow}
        onClose={onLeave}
        position={position}
        targetRef={targetRef.current}
      >
        {content}
      </Content>
    </React.Fragment>
  );
};

export default CustomTooltip;
