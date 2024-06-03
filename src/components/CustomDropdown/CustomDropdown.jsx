import React, { Children, cloneElement, useRef } from 'react';
import Dropdown from './Components/Dropdown';

const CustomDropdown = ({
  isOpen = false,
  onClose,
  content: Content,
  width = 'fit',
  children,
}) => {
  const containerRef = useRef(null);

  if (children.length > 1) throw new Error('Only one element child node is allowed.');
  return (
    <React.Fragment>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { ref: (ref) => (containerRef.current = ref) })
      })}
      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        width={width}
        containerRef={containerRef.current}
      >
        {Content}
      </Dropdown>
    </React.Fragment>
  )
}

export default CustomDropdown;