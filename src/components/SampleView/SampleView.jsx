import React, { useState } from 'react';
import s from './SampleGrid.module.scss';
import cx from 'classnames';
import { GRID, LIST } from './SampleViewConstants';
import Grid from './Components/Grid';
import List from './Components/List';
import Pagination from './Components/Pagination';
import Search from './Components/Search';
// import LeftMenu from './Components/LeftMenu';
// import SelectV2 from 'components/SelectV2/Select';

// const OptionV2 = SelectV2.Option;

const SampleView = ({
  data = [],
  currentPage = 1,
  count = 0,
  paginationEnabled = true,
  searchEnabled = true,
  menuEnabled = true,
  sortEnabled,
  readOnly = true,
  sortingKeys = [],
  pageSize = 28,
  selectionEnabled = false,
  rowSelected = [],
  handleItemOnClick = (value) => { },
  handlePageOnChange = (value) => { },
  handleCreate = () => { },
  handleOnSearch = (value) => { },
  handleKeywordOnChange = (value) => { },
  handleSortingFunction = (value) => { },
}) => {
  const [displayType, setDisplayType] = useState(LIST)
  const config = {
    data,
    readOnly,
    selectionEnabled,
    rowSelected,
    handleItemOnClick,
    handleCreate
  }

  const getTogglerTransform = ({
    LIST: 'translateX(0%)',
    MAP: 'translateX(calc(100% - 7.5px/2))'
  }[displayType])

  return (
    <div className={s.root}>
      <div className={s.sortersContainer}>
        {searchEnabled && <Search
          onSearch={handleOnSearch}
          onChange={handleKeywordOnChange}
        />}
        {/* {sortEnabled && <SelectV2
          defaultValue={sortingKeys[0]}
          place
          onSelect={(value) => handleSortingFunction(value)}
          icon={<div className={s.sortIcon} />}
          style={{ maxWidth: '200px', height: "60px" }}
        >
          {sortingKeys.map((value) => {
            return <OptionV2 value={value}>{value}</OptionV2>;
          })}
        </SelectV2>} */}
        <div className={s.switch}>
          <div
            className={s.toggler}
            style={{
              transform: getTogglerTransform
            }}
          >
          </div>
          <div
            className={cx(s.grid, displayType === GRID && s.active)}
            onClick={() => setDisplayType(GRID)}
          />
          <div
            className={cx(s.list, displayType === LIST && s.active)}
            onClick={() => setDisplayType(LIST)}
          />
        </div>
      </div>
      <div className={s.viewWrapper}>
        {{
          GRID: <Grid {...config} />,
          LIST: <List {...config} />
        }[displayType]}
      </div>
      {paginationEnabled && <Pagination
        currentPage={currentPage}
        count={count}
        pageSize={pageSize}
        handlePageOnChange={handlePageOnChange}
      />}
    </div>
  )
}

export default SampleView;