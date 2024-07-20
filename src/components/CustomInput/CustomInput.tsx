import React, {
  useRef,
  useState,
  FC,
  MouseEventHandler,
  FocusEventHandler,
  ReactNode,
  ChangeEvent,
} from 'react';
import s from './CustomInput.module.scss';
import cx from 'classnames';
import noop from 'lodash/noop';

interface CustomInputProps {
  outline?: boolean,
  value: string | number,
  type?: string,
  label?: string,
  placeholder?: string,
  maxLength?: number,
  disabled?: boolean,
  max?: number,
  min?: number,
  reg?: RegExp,
  onChange?: MouseEventHandler,
  onFocus?: FocusEventHandler,
  onBlur?: () => void,
  className?: Record<string, string>,
  prefix?: string | ReactNode,
  suffix?: string | ReactNode,
  error?: boolean,
  errorText?: string,
}

const CustomInput: FC<CustomInputProps> = ({
  outline = false,
  value,
  type = 'text', /** HTML Input Types */
  label,
  placeholder,
  maxLength = Number.POSITIVE_INFINITY,
  disabled = false, /** character maximun length */
  max = Number.POSITIVE_INFINITY, /** maximun number value */
  min = Number.NEGATIVE_INFINITY, /** minimum number value */
  reg = /.*/,
  onChange = noop,
  onFocus = noop,
  onBlur = noop,
  className: c = {
    container: '',
    inputRoot: '',
    prefix: '',
    suffix: ''
  },
  prefix,
  suffix,
  error = false,
  errorText,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isError, setIsError] = useState(error);

  const previewPasswordOnChange = () => {
    if (inputRef.current) {
      const inputType = inputRef.current.getAttribute('type');
      inputRef.current.setAttribute('type',
        inputType === 'text'
          ? 'password'
          : 'text'
        //    {
        //   'text': 'password',
        //   'password': 'text',
        // }[inputType]
      );
    }
  }

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      if (e.target.value === 'e') return;
      e.target.value = Math.max(Math.min(Number(e.target.value), max), min).toString() || '';
    }
    onChange(e);
  }

  const handleOnBlur = () => {
    if (typeof value === 'string') setIsError(!reg.test(value));
    onBlur();
  };

  return (
    <div className={cx(s.container, {
      [s.outline]: outline,
      [s.default]: !outline
    }, c.container)}>
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
        <fieldset className={cx({ [s.error]: error || isError })}>
          {label && <legend>{label}</legend>}
        </fieldset>
      </span>
      {(error || isError) && <p>{errorText}</p>}
    </div>
  )
}
export default CustomInput;