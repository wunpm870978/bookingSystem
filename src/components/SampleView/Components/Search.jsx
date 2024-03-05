import React, { useRef } from 'react';
import s from './Search.scss';
import { SearchOutlined } from '@ant-design/icons';

const Search = ({
  placeholder = '',
  style = {},
  value = '',
  onSearch = (value) => { },
  onChange = (value) => { },
  onBlur = () => { },
}) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        onSearch(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.toolbar}>
      <div className={s.inputWrapper} style={style}>
        <input
          placeholder={placeholder}
          type='text'
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          ref={inputRef}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          onChange={onChange}
        />
        <button>
          <SearchOutlined className={s.searchIcon} onClick={() => onSearch(inputRef.current.value)} />
        </button>
      </div>
    </div>
  )
}

export default Search;