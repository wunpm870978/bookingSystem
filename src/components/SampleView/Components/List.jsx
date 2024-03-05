import React from 'react';
import s from './List.module.scss';
import cx from 'classnames';

const List = ({
  readOnly = false,
  data = [],
  selectionEnabled,
  rowSelected,
  handleItemOnClick = (value) => { },
  handleCreate = () => { }
}) => {
  return (
    <div className={s.listWrapper}>
      {!readOnly && <div className={s.createWrapper} onClick={handleCreate}>
        Create New
      </div>}
      {data.map((item) => {
        return (
          <div className={cx({ [s.checkboxWrapper]: selectionEnabled })}>
            {selectionEnabled && <input
              type="checkbox"
              checked={selectionEnabled && rowSelected.includes(item)}
              onClick={() => handleItemOnClick(item)}
            />}
            <div
              className={s.cardWrapper}
              onClick={() => handleItemOnClick(item)}
            >
              <div
                className={s.imageContainer}
                style={{ backgroundImage: `url(${_.get(item, 'image')})` }}
              >
                {/**
               * custom tags here or others
               */}
              </div>
              <div className={s.contentWrapper}>
                {/**
               * custom content here
               */}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List;