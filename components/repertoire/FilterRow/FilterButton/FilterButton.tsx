import React from 'react';
import classnames from 'classnames/bind';

import styles from './FilterButton.module.scss';

const cx = classnames.bind(styles);

export default function FilterButton({
    setFilter,
    filter,
    index,
    isFilterOnArray,
    setIsFilterOnArray,
}: any) {
    function handleSetFilter(filter: string) {
        setFilter(filter);
        setIsFilterOnArray((prevState: boolean[]) => {
            const resultArray = prevState.map(() => false);
            resultArray[index] = true;

            return resultArray;
        });
    }

    return (
        <button
            className={cx(
                'btn',
                isFilterOnArray[index] ? 'btn-danger' : 'btn-link'
            )}
            onClick={() => handleSetFilter(filter)}
        >
            {filter}
        </button>
    );
}
