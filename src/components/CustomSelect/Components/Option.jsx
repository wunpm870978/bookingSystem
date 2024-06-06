import React from 'react';
import s from './Option.module.scss';
import cx from 'classnames';
import { MODE } from '../CustomSelectConstants';
import PropTypes from 'prop-types';

const { TAG, MULTIPLE, DEFAULT } = MODE;

const Option = ({ mode, value, selectedValue, children, onClick }) => {
  const isMultiSelected = mode !== DEFAULT && selectedValue.includes(value);
  const isSelected = selectedValue === value;
  return (
    <li
      className={cx(s.option, { [s.selected]: isMultiSelected || isSelected })}
      onClick={(e) => onClick(e, children, value)}
    >
      <span>{children}</span>
      {isMultiSelected && <img alt='' src='/icon_tick.svg' />}
    </li>
  );
};

Option.displayName = 'SelectOption';
Option.propTypes = {
  mode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired
}
export default Option;