import React, { useRef } from 'react'
import PopoverContent from './Components/PopoverContent';

const CustomPopover = ({
  isOpen = false,
  onClose = () => { },
  /**
   * position
   * 1) top
   * 2) bottom
   * 3) left
   * 4) right
   * 5) topleft
   */
  position = 'left',
  maskEnabled = true,
  children,
  content,
}) => {
  const targetRef = useRef(null);

  if (children.length > 1) return false;
  return (
    <React.Fragment>
      {React.Children.map(children, (child) => React.cloneElement(child, { ref: (ref) => targetRef.current = ref }))}
      <PopoverContent
        isOpen={isOpen}
        onClose={onClose}
        position={position}
        targetRef={targetRef.current}
        maskEnabled={maskEnabled}
      >
        {content}
      </PopoverContent>
    </React.Fragment>
  )
}

export default CustomPopover;