import React, { Dispatch, SetStateAction } from 'react';
import classnames from 'classnames/bind';

import MenuRow from '../../../../../components/common/MenuRow';

import styles from './Submenu.module.scss';

const cx = classnames.bind(styles);

interface Props {
    index?: number;
    isOpen: boolean;
    setIsSubmenuOpen: Dispatch<SetStateAction<boolean>>;
    options: { title: string; link: string }[];
}
export default function Submenu({
    index,
    isOpen,
    setIsSubmenuOpen,
    options,
}: Props) {
    const posY = `pos${index}`;

    const cs = ['submenu'];

    cs.push(isOpen ? 'open' : 'close');
    cs.push(index && index > -1 ? posY : '');

    return (
        <div
            className={cx(cs)}
            onMouseEnter={() => setIsSubmenuOpen(true)}
            onMouseLeave={() => setIsSubmenuOpen(false)}
        >
            {options.map((option, index) => (
                <MenuRow key={index} title={option.title} link={option.link} />
            ))}
        </div>
    );
}
