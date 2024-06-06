import React, { useRef, useState, useId } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { MODE } from '../CustomSelectConstants';
import s from './TagWrapper.module.scss';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
const { TAG, MULTIPLE, DEFAULT } = MODE;

const TagWrapper = ({
  mode,
  selectedValue,
  onSwap,
  onSelect,
}) => {
  const selectedElementRef = useRef(null);
  const copiedElementRef = useRef(null);
  const [dragId, setDragId] = useState(null);
  const counterRef = useRef(null);
  const eleId = useId();

  const handleDrag = (e) => {
    if (mode === TAG) setDragId(e.currentTarget.id);
  };

  const handleDrop = (e) => {
    if (e.currentTarget.id.split('_')[0] === eleId) {
      handleSwapping(dragId.split('_')[1], e.currentTarget.id.split('_')[1]);
    }
  };

  const handleSwapping = (oldId, newId) => {
    if (!oldId || !newId) return;
    const dragItem = selectedValue.indexOf(oldId);
    const dropItem = selectedValue.indexOf(newId);
    if (dragItem !== -1 && dropItem !== -1 && dragItem !== dropItem) {
      // swap item by index
      const newTags = cloneDeep(selectedValue);
      newTags.splice(dropItem, 0, newTags.splice(dragItem, 1)[0]);
      onSwap(newTags);
      setDragId(null);
    }
  };

  const handleTouchStart = (e, value, closeRef) => {
    e.stopPropagation();
    e.preventDefault();

    if (mode !== TAG) return;
    if (closeRef.current.contains(e.touches[0].target)) return handleDelete(e, value)

    /** start counting touch time*/
    counterRef.current = new Date().getTime();
    document.body.style.overflow = 'hidden';

    const touch = e.touches[0];
    /** dunplicate the touched element */
    selectedElementRef.current = document.getElementById(e.currentTarget.id);
    const copiedElement = selectedElementRef.current.cloneNode(true);
    copiedElement.id = `copied_${e.currentTarget.id.split('_')[1]}`;
    copiedElement.style.position = 'fixed';
    copiedElement.style.left = `${touch.clientX}px`;
    copiedElement.style.top = `${touch.clientY -
      selectedElementRef.current.getBoundingClientRect().height / 2
      }px`;
    copiedElement.style.zIndex = '2';
    selectedElementRef.current.after(copiedElement);
    copiedElementRef.current = copiedElement;
    // set selected element hidden扮拖咗出黎
    selectedElementRef.current.style.visibility = 'hidden';
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    /** change copied element style to follow touch point */
    const touch = e.touches[0];
    var hoveredElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    copiedElementRef.current.style.left = `${touch.clientX}px`;
    copiedElementRef.current.style.top = `${touch.clientY -
      copiedElementRef.current.getBoundingClientRect().height / 2
      }px`;
    /** set collided tag id */
    if (
      !!hoveredElement.id &&
      !hoveredElement.id.startsWith('copied') &&
      hoveredElement.id !== dragId &&
      hoveredElement.id.split('_')[1] !==
      copiedElementRef.current.id.split('_')[1]
    ) {
      selectedElementRef.current.style.visibility = 'visible';
      setDragId(hoveredElement.id);
      handleSwapping(
        copiedElementRef.current.id.split('_')[1],
        hoveredElement.id.split('_')[1]
      );
      // reset hidden element position
      selectedElementRef.current = hoveredElement;
      selectedElementRef.current.style.visibility = 'hidden';
    }
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();

    /** detect click event */
    if ((new Date().getTime() - counterRef.current) / 1000 < 0.3) {
      /** to do */
    }
    /** reset element params */
    if (dragId) {
      handleSwapping(
        copiedElementRef.current.id.split('_')[1],
        dragId.split('_')[1]
      );
    }
    copiedElementRef.current.remove();
    copiedElementRef.current = null;
    selectedElementRef.current.style.visibility = 'visible';
    selectedElementRef.current = null;
    counterRef.current = null;

    /** unsubscribe scroll event */
    document.body.style.overflow = '';
  };

  const handleDelete = (e, value) => {
    e.stopPropagation();
    onSelect(selectedValue.filter((item) => item !== value));
  };

  if (mode === DEFAULT || isEmpty(selectedValue)) return null;
  return (
    <React.Fragment>
      {selectedValue.map((value, index) => {
        if (value === '') return null;
        return (
          <Tag
            eleId={eleId}
            value={value}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            handleDelete={handleDelete}
          />
        );
      })}
    </React.Fragment>
  )
}

const Tag = ({
  eleId,
  value,
  handleDrag,
  handleDrop,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleDelete,
}) => {
  const closeRef = useRef(null);

  return (
    <div
      className={s.tag}
      draggable={true}
      id={`${eleId}_${value}`}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      // onClick={handleOnClick}
      onTouchStart={(e) => handleTouchStart(e, value, closeRef)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {value}
      <a ref={closeRef} className={s.close} onClick={(e) => handleDelete(e, value)} />
    </div>
  )
}

TagWrapper.propTypes = {
  mode: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  onSwap: PropTypes.func,
  onSelect: PropTypes.func,
}
export default TagWrapper;