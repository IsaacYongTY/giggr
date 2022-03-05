import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames/bind';
import Select, { ValueType } from 'react-select';

import { majorKeyArray, minorKeyArray } from './constants';
import convertKeyToKeyModeInt from 'lib/utils/convert-key-to-key-mode-int';

import styles from './KeysDropdown.module.scss';

const cx = classnames.bind(styles);

type KeysDropdownProps = {
    label: string;
    showIsMinorCheckbox?: boolean;
    handleKeysDropdownChange: (keyString: string) => void;
    selectedKey: string;
    handleIsMinorToggle?: () => void;
};

interface OptionType {
    value: string;
    label: string;
}

export default function KeysDropdown({
    label,
    showIsMinorCheckbox = true,
    handleKeysDropdownChange,
    handleIsMinorToggle,
    selectedKey,
}: KeysDropdownProps) {
    const [, mode] = useMemo(
        () => convertKeyToKeyModeInt(selectedKey || ''),
        [selectedKey]
    );

    const [isMinor, setIsMinor] = useState(mode === 0);

    const minorKeyOptions = useMemo(
        () =>
            minorKeyArray.map((key) => ({
                value: key,
                label: key,
            })),
        []
    );
    const majorKeyOptions = useMemo(
        () =>
            majorKeyArray.map((key) => ({
                value: key,
                label: key,
            })),
        []
    );

    const [keyOptions, setKeyOptions] = useState<OptionType[]>([]);

    const toggleMinor = (checked: boolean) => {
        if (!handleIsMinorToggle || !showIsMinorCheckbox) {
            return;
        }

        setKeyOptions(checked ? minorKeyOptions : majorKeyOptions);
        setIsMinor(checked);
        handleIsMinorToggle();
    };

    function handleChange(selectedOption: ValueType<OptionType, false>) {
        if (!selectedOption) {
            return;
        }

        handleKeysDropdownChange(selectedOption.value);
    }

    useEffect(() => {
        if (!selectedKey) {
            setKeyOptions(majorKeyOptions);
            return;
        }
        setKeyOptions(mode === 1 ? majorKeyOptions : minorKeyOptions);
    }, []);

    return (
        <div className={cx('container')}>
            <label>
                {label}:
                <Select
                    name="key"
                    value={{
                        value: selectedKey,
                        label: selectedKey,
                    }}
                    options={keyOptions}
                    className="basic-single"
                    onChange={handleChange}
                    isSearchable={false}
                />
            </label>
            {showIsMinorCheckbox && (
                <label className={cx('checkbox')}>
                    <input
                        type="checkbox"
                        checked={isMinor}
                        onChange={(e) => toggleMinor(e.target.checked)}
                    />
                    Minor
                </label>
            )}
        </div>
    );
}
