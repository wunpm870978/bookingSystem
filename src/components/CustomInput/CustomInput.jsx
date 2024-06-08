import React, { useRef, useState, useEffect } from 'react';
import s from './CustomInput.module.scss';
import cx from 'classnames';
import { PropTypes } from 'prop-types';
import noop from 'lodash/noop';

const CustomInput = ({
  value,
  type,
  label,
  placeholder,
  maxLength,
  disabled,
  max,
  min,
  reg,
  onChange,
  onFocus,
  onBlur,
  className: c,
  prefix,
  suffix,
}) => {
  const inputRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);

  const previewPasswordOnChange = () => {
    inputRef.current.getAttribute('type');
    inputRef.current.setAttribute('type', {
      'text': 'password',
      'password': 'text',
    }[inputRef.current.getAttribute('type')]);
    setIsPreview(prev => !prev);
  }

  const inputOnChange = (e) => {
    if (type === 'number') {
      if (e.target.value === 'e') return;
      e.target.value = Math.max(Math.min(e.target.value, max), min);
    }
    onChange(e);
  }

  return (
    <span className={cx(s.inputRoot, c.inputRoot)}>
      {prefix && <span className={cx(s.prefix, c.prefix)}>{prefix}</span>}
      <label className={cx(s.label, { [s.textFilled]: value })}>{label}</label>
      <input
        className={c.input}
        type={type}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        ref={inputRef}
        value={type === 'number' && value === 0 ? '' : value}
        onChange={inputOnChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {suffix && <span className={cx(s.suffix, c.suffix)}>{suffix}</span>}
      {type === 'password' && <span className={s.password}>
        <img
          className={s.eye}
          onClick={previewPasswordOnChange}
          src={`/assets/svg/eye-${isPreview ? 'hide' : 'view'}.svg`}
        />
      </span>}
      <fieldset><legend>{label}</legend></fieldset>
    </span>
  )
}

CustomInput.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  maxLength: Number.POSITIVE_INFINITY,
  disabled: false,
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  reg: /.*/g,
  className: {
    inputRoot: '',
    prefix: '',
    input: '',
    suffix: '',
  },
  prefix: null,
  suffix: null,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
}
CustomInput.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  reg: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.shape({
    inputRoot: PropTypes.string,
    prefix: PropTypes.string,
    input: PropTypes.string,
    suffix: PropTypes.string
  }),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};

export default CustomInput;