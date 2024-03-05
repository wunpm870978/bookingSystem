import React, { useMemo } from 'react';
import s from './Pagination.module.scss';
import cx from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Pagination = ({
  currentPage = 1,
  count = 0,
  pageSize = 28,
  handlePageOnChange = (value) => { },
}) => {
  const totalPage = useMemo(() => {
    return Math.ceil(count / pageSize)
  }, [count, pageSize])
  const validPagination = (item) => {
    if (currentPage === 1) return item < 4
    if (currentPage === totalPage) return item === currentPage - 2 ||
      item === currentPage - 1 ||
      item === currentPage
    return item === currentPage - 1 ||
      item === currentPage ||
      item === currentPage + 1
  }

  if (count === 0) return false
  return (
    <div className={s.paginationWrapper}>
      {currentPage !== 1 && <div className={s.paginationContainer}>
        <LeftOutlined />
      </div>}
      {Array
        .from(Array(totalPage), (item, index) => index + 1)
        .filter(validPagination)
        .map((item) => {
          return (
            <div
              className={cx(
                s.paginationContainer,
                item === currentPage && s.selected
              )}
              onClick={() => handlePageOnChange(item)}
            >
              {item}
            </div>
          )
        })}
      {(currentPage !== totalPage || totalPage !== 1) && <div className={s.paginationContainer}>
        <RightOutlined />
      </div>}
    </div>
  )
}
export default Pagination;