import React, { useRef, useState } from 'react';
import s from './CustomInput2.module.scss';
import cx from 'classnames';

const CustomInput2 = ({
  value,
  type = 'text',
  placeholder = '',
  maxLength = 500,
  disabled = false,
  max = Number.POSITIVE_INFINITY,
  min = Number.NEGATIVE_INFINITY,
  reg = /.*/g,
  onChange = (e) => { },
  onFocus = () => { },
  onBlur = () => { },
  className: c = {
    inputRoot: '',
    prefix: '',
    input: '',
    suffix: '',
  },
  prefix = null,
  suffix = null,
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
      e.target.value = Math.max(Math.min(e.target.value, max), min);
    }
    onChange(e);
  }

  return (
    <span className={cx(s.inputRoot, c.inputRoot)}>
      {prefix && <span className={cx(s.prefix, c.prefix)}>{prefix}</span>}
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
      {/* {type === 'password' && <span className={s.password}>
        <Icon
          onClick={previewPasswordOnChange}
          type={isPreview ? 'eye-o' : 'eye'}
        />
      </span>} */}
    </span>
  )
}



export default CustomInput2;