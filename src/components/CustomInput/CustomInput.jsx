import React, { useRef, useState } from 'react';
import s from './CustomInput.module.scss';
import cx from 'classnames';
import { PropTypes } from 'prop-types';
import noop from 'lodash/noop';

const CustomInput = ({
  value,
  type, /** HTML Input Types */
  label,
  placeholder,
  maxLength,
  disabled, /** character maximun length */
  max, /** maximun number value */
  min, /** minimum number value */
  reg,
  onChange,
  onFocus,
  onBlur,
  className: c,
  prefix,
  suffix,
  error,
  errorText,
}) => {
  const inputRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isError, setIsError] = useState(error);

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
      e.target.value = Math.max(Math.min(e.target.value, max), min) || '';
    }
    onChange(e);
  }

  const handleOnBlur = () => {
    setIsError(!reg.test(value));
    onBlur();
  };

  return (
    <div className={cx(s.container, c.container)}>
      <span className={cx(s.inputRoot, c.inputRoot)}>
        {prefix && <span className={cx(s.prefix, c.prefix)}>{prefix}</span>}
        {label && <label className={cx(s.label, { [s.textFilled]: value })}>{label}</label>}
        <input
          type={type}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          ref={inputRef}
          value={value}
          onChange={inputOnChange}
          onFocus={onFocus}
          onBlur={handleOnBlur}
        />
        {suffix && <span className={cx(s.suffix, c.suffix)}>{suffix}</span>}
        {type === 'password' && <span className={s.password}>
          <img
            className={s.eye}
            onClick={previewPasswordOnChange}
            src={`/assets/svg/eye-${isPreview ? 'hide' : 'view'}.svg`}
          />
        </span>}
        <fieldset className={cx({ [s.error]: isError })}>
          {label && <legend>{label}</legend>}
        </fieldset>
      </span>
      {isError && <p>{errorText}</p>}
    </div>
  )
}

CustomInput.defaultProps = {
  value: '',
  type: 'text',
  label: '',
  placeholder: '',
  maxLength: Number.POSITIVE_INFINITY,
  disabled: false,
  max: Number.POSITIVE_INFINITY,
  min: Number.NEGATIVE_INFINITY,
  reg: /.*/,
  className: {
    container: '',
    inputRoot: '',
    prefix: '',
    suffix: '',
  },
  prefix: null,
  suffix: null,
  error: false,
  errorText: '',
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
  type: PropTypes.oneOf(['text', 'number', 'password']),
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
    container: PropTypes.string,
    inputRoot: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string
  }),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  error: PropTypes.bool,
  errorText: PropTypes.string
};

export default CustomInput;