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
import cloneDeep from 'lodash/cloneDeep';
import trimStart from 'lodash/trimStart';
import { MODE, DEFAULT_VALUE } from './CustomSelectConstants';
import TagWrapper from './Components/TagWrapper';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const { TAG, MULTIPLE, DEFAULT } = MODE;

const CustomSelect = ({
  showSearch,
  filterDisabled,
  className: c,
  icon: CustomIcon,
  placeholder,
  value: selectedValue,
  mode,
  onChange,
  onSelect,
  onBlur,
  onSwap,
  children,
}) => {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({
    default: DEFAULT_VALUE.OBJECT,
    multiple: DEFAULT_VALUE.ARRAY,
    tag: DEFAULT_VALUE.ARRAY,
  }[mode]);

  const onNotFocus = (e) => {
    if (!rootRef.current.contains(e.target) && mode === DEFAULT) setVisible(false);
  };

  const optionOnClick = (event, title, value) => {
    event.preventDefault();
    event.stopPropagation();
    setInputValue('');
    if (mode === DEFAULT) {
      onSelect(value);
      setVisible(false);
    } else {
      if (selectedValue.includes(value)) {
        onSelect(selectedValue.filter(item => item.toString() !== value.toString()));
      } else {
        const newTags = cloneDeep(selectedValue);
        newTags.push(value);
        onSelect(newTags);
      }
    }
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

  const handleOnBlur = () => {
    if (mode !== DEFAULT && inputValue !== '') {
      // save tag when text is not empty
      const newTags = cloneDeep(selectedValue);
      newTags.push(trimStart(inputValue));
      onSelect(newTags)
      setInputValue('');
    }
    onBlur();
  };

  const handleKeyDown = (e) => {
    if (mode !== DEFAULT) {
      switch (e.key) {
        case 'Enter':
          if (!selectedValue.includes(inputValue)) {
            // prevent duplicated value
            if (!trimStart(inputValue)) return;
            const newTags = cloneDeep(selectedValue);
            newTags.push(trimStart(inputValue));
            onSelect(newTags);
          }
          setInputValue('');
          break;
        case 'Backspace':
        case 'Delete':
          if (inputValue === '') {
            // delete tag when text is empty
            const newTags = cloneDeep(selectedValue);
            newTags.pop();
            onSelect(newTags);
          } else {
            inputRef.current.style.width = `${inputValue.length}ch`;
          }
          break;
        default:
          inputRef.current.style.width = `${inputValue.length}ch`;
          break;
      }
    }
  };

  useEffect(() => {
    if (mode === DEFAULT) {
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
    }
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
        <TagWrapper
          mode={mode}
          onSwap={onSwap}
          selectedValue={selectedValue}
          onSelect={onSelect}
        />
        <input
          disabled={mode === DEFAULT && !showSearch}
          ref={inputRef}
          className={cx(s.input, c.input, { [s.emptyInput]: !selectedValue })}
          placeholder={selected && selected.title || placeholder}
          value={inputValue}
          onChange={inputOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
        />
        <div className={cx(s.icon, c.icon)} onClick={dropdownOnVisible}>
          {isValidElement(CustomIcon)
            ? CustomIcon
            : <img
              className={s.arrow}
              src={`/assets/svg/${visible ? 'arrowup' : 'arrowdown'}.svg`}
            />
          }
        </div>
        <Dropdown isOpen={visible} containerRef={rootRef}>
          {Children.map(children, (child, index) => {
            const displayName = child.type.displayName;
            const isNotMatchValue =
              !filterDisabled &&
              inputValue.toLowerCase() &&
              !child.props.value
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            if (!isNotMatchValue && displayName === 'SelectOption') {
              return cloneElement(child, {
                mode,
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
CustomSelect.propTypes = {
  showSearch: PropTypes.bool,
  filterDisabled: PropTypes.bool,
  className: PropTypes.object,
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  mode: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onBlur: PropTypes.func,
  onSwap: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}
CustomSelect.defaultProps = {
  showSearch: false,
  filterDisabled: false,
  className: { inputWrapper: '', input: '', icon: '' },
  icon: null,
  placeholder: '',
  mode: DEFAULT,
  onChange: noop,
  onSelect: noop,
  onBlur: noop,
  onSwap: noop,
}
export default CustomSelect;