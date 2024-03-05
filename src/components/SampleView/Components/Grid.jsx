import React from 'react';
import s from './Grid.module.scss';
import cx from 'classnames';

const Grid = ({
  readOnly = true,
  data = [],
  selectionEnabled,
  rowSelected,
  handleItemOnClick = (value) => { },
  handleCreate = () => { }
}) => {

  return (
    <div className={s.gridWrapper}>
      {!readOnly && <div className={s.createWrapper} onClick={handleCreate}>
        Create New
      </div>}
      {data.map((item, index) => {
        return (
          <div className={s.checkboxWrapper} onClick={() => handleItemOnClick(item)}>
            <input
              type="checkbox"
              className={s.checkboxInput}
              checked={selectionEnabled && rowSelected.includes(item)}
            />
            <div className={cx(s.cardWrapper, {
              [s.checkboxTile]: selectionEnabled,
            })}>
              {selectionEnabled && <span className={s.checkboxIcon}><div /></span>}
              <div
                className={s.imageContainer}
                style={{ backgroundImage: `url(${_.get(item, 'image')})` }}
              >
                {/**
               * custom tags here or others
               */}
                <div className={s.tag}>{_.get(item, 'tags')}</div>
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

export default Grid;