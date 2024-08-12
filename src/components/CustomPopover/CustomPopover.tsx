import React, { FC, ReactNode, useRef, Children, cloneElement, isValidElement } from 'react'
import PopoverContent from './Components/PopoverContent';

interface CustomPopoverProps {
  isOpen: boolean,
  onClose: () => void,
  position?: 'left' | 'right' | 'top' | 'bottom' | 'topleft' | 'bottomleft',
  maskEnabled?: boolean,
  children: ReactNode,
  content: ReactNode,
}

interface ChildrenProps {
  ref?: (ref: HTMLElement) => void
}

const CustomPopover: FC<CustomPopoverProps> = ({
  isOpen = false,
  onClose = () => { },
  position = 'left',
  maskEnabled = false,
  children,
  content,
}) => {
  const targetRef = useRef<HTMLElement | null>(null);

  if (children && Children.count(children) > 1) return null;
  return (
    <React.Fragment>
      {Children.map(children, (child: ReactNode) => {
        if (isValidElement(child))
          return (
            <child.type
              {...child.props}
              ref={(ref: HTMLElement) => (targetRef.current = ref)}
            />
          )
        // return cloneElement(child, { ref: (ref: HTMLElement) => targetRef.current = ref })
        //   return null;
      })}
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