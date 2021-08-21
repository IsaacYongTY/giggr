import React, { useState } from 'react';
import classnames from 'classnames/bind';

import FilterButton from './FilterButton';

import styles from './FilterRow.module.scss';

const cx = classnames.bind(styles);

type FilterRowProps = {
    setFilter: (filter: string) => void
}

export default function FilterRow({ setFilter }: FilterRowProps) {
    const filterOptions = ['title', 'initialism', 'artist'];
    const initialFilter = 'title';

    const [isFilterOnArray, setIsFilterOnArray] = useState(
        filterOptions.map((filter) => filter === initialFilter)
    );

    return (
        <div className={cx('container')}>
            <div>Filter:</div>
            {filterOptions.map((filter, index) => (
                <FilterButton
                    filter={filter}
                    setFilter={setFilter}
                    index={index}
                    setIsFilterOnArray={setIsFilterOnArray}
                    isFilterOnArray={isFilterOnArray}
                    key={index}
                />
            ))}
        </div>
    );
}
