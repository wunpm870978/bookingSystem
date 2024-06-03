import React, {
  useState,
  Children,
  cloneElement,
  useEffect,
  isValidElement,
  useRef,
} from 'react';
import s from './CustomSelect.module.scss';
import cx from 'classnames';
import Dropdown from './Components/Dropdown';
import Option from './Components/Option';

const DEFAULT_VALUE = {
  title: '',
  value: '',
};

const CustomSelect = ({
  showSearch = false,
  filterDisabled = false,
  className: c = { inputWrapper: '', input: '', icon: '' },
  icon: CustomIcon = null,
  placeholder = '',
  value: selectedValue = '',
  onChange = (e) => { },
  onSelect = (value) => { },
  children,
}) => {
  const rootRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(DEFAULT_VALUE);

  const onNotFocus = (e) => {
    if (!rootRef.current.contains(e.target)) setVisible(false);
  };

  const optionOnClick = (event, title, value) => {
    event.preventDefault();
    event.stopPropagation();
    setInputValue('');
    onSelect(value);
    setVisible(false);
  };

  const inputOnChange = (e) => {
    onChange(e);
    setInputValue(e.target.value);
  };

  const dropdownOnVisible = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setVisible((prev) => showSearch || !prev);
  };

  useEffect(() => {
    const selectedOption = Children.toArray(children).find(
      (child) => child.props.value === selectedValue
    );
    setSelected(
      selectedOption
        ? {
          title: selectedOption.props.children,
          value: selectedOption.props.value,
        }
        : DEFAULT_VALUE
    );
  }, [selectedValue]);

  useEffect(() => {
    if (visible) document.addEventListener('mousedown', onNotFocus);
    else document.removeEventListener('mousedown', onNotFocus);
    return () => {
      document.removeEventListener('mousedown', onNotFocus);
    };
  }, [visible]);

  return (
    <React.Fragment>
      <span
        ref={rootRef}
        className={cx(s.root, c.inputWrapper)}
        onClick={dropdownOnVisible}
      >
        <input
          disabled={!showSearch}
          className={cx(s.input, c.input, { [s.emptyInput]: !selectedValue })}
          placeholder={selected.title || placeholder}
          value={inputValue}
          onChange={inputOnChange}
        />
        <div className={cx(s.icon, c.icon)}>
          {/* {isValidElement(CustomIcon) ? CustomIcon : <Icon type='down' />} */}
        </div>
        <Dropdown isOpen={visible} containerRef={rootRef}>
          {Children.map(children, (child, index) => {
            const displayName = child.type.displayName;
            const isNotMatchValue = !filterDisabled &&
              inputValue.toLowerCase() &&
              !child.props.value.toLowerCase().includes(inputValue.toLowerCase())
            if (!isNotMatchValue && displayName === 'SelectOption') {
              return cloneElement(child, {
                selectedValue,
                onClick: optionOnClick,
              });
            }
            return null;
          })}
        </Dropdown>
      </span>
    </React.Fragment>
  );
};

CustomSelect.displayName = 'Select';
CustomSelect.Option = Option;
export default CustomSelect;