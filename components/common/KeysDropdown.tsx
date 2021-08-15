import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';
import Select from 'react-select';

import { majorKeyArray, minorKeyArray } from '../../lib/data/data';
import convertRelativeKey from '../../lib/utils/convert-relative-key';
import Form from '../../lib/types/Form';

import convertKeyModeIntToKey from '../../lib/utils/convert-key-mode-int-to-key';
import convertKeyToKeyModeInt from '../../lib/utils/convert-key-to-key-mode-int';

import styles from '../../assets/scss/components/common/_keys-dropdown.module.scss';

type Props = {
    label: string;
    keyProp?: 'key' | 'myKey';
    form: Form;
    setForm: Dispatch<SetStateAction<any>>;
    defaultKey?: string;
    showIsMinorCheckbox?: boolean;
};

interface OptionType {
    value: string;
    label: string;
}

export default function KeysDropdown({
    label,
    keyProp = 'key',
    form,
    setForm,
    defaultKey,
    showIsMinorCheckbox = true,
}: Props) {
    const minorKeyOptions = minorKeyArray.map((key) => ({
        value: key,
        label: key,
    }));
    const majorKeyOptions = majorKeyArray.map((key) => ({
        value: key,
        label: key,
    }));

    const [keyOptions, setKeyOptions] = useState<OptionType[]>([]);

    function toggleMinor(e: ChangeEvent<HTMLInputElement>) {
        if (keyProp !== 'key' && keyProp !== 'myKey') return;
        const currentKeyString = convertKeyModeIntToKey(
            form[keyProp],
            form?.mode
        );

        if (form.mode === undefined) {
            setKeyOptions(minorKeyOptions);
            setForm((prevState: any) => ({ ...prevState, mode: 0 }));
        }

        if (!currentKeyString) {
            if (e.target.checked) {
                setKeyOptions(minorKeyOptions);
                setForm((prevState: any) => ({ ...prevState, mode: 0 }));
                return;
            }

            setKeyOptions(majorKeyOptions);
            setForm((prevState: any) => ({ ...prevState, mode: 1 }));
            return;
        }

        if (e.target.checked) {
            const relativeMinor = convertRelativeKey(currentKeyString);
            const [key] = convertKeyToKeyModeInt(relativeMinor);

            setKeyOptions(minorKeyOptions);
            setForm((prevState: any) => ({
                ...prevState,
                [keyProp]: key,
                mode: 0,
            }));
            return;
        }

        const relativeMajor = convertRelativeKey(currentKeyString);
        const [key] = convertKeyToKeyModeInt(relativeMajor);
        setKeyOptions(majorKeyOptions);
        setForm((prevState: any) => ({
            ...prevState,
            [keyProp]: key,
            mode: 1,
        }));
    }

    function handleChange(selectedOption: any) {
        const [selectedKey, selectedMode]: number[] = convertKeyToKeyModeInt(
            selectedOption.value
        );
        setForm((prevState: any) => ({
            ...prevState,
            [keyProp]: selectedKey,
            mode: selectedMode,
        }));
    }

    useEffect(() => {
        const [, defaultMode] = convertKeyToKeyModeInt(defaultKey || '');
        if (defaultKey) {
            const foundKey = majorKeyOptions.find(
                (option) => option.value === defaultKey
            );

            if (foundKey) {
                const [key, mode] = convertKeyToKeyModeInt(foundKey.value);
                setForm((prevState: any) => ({
                    ...prevState,
                    [keyProp]: key,
                    mode,
                }));
            }
        }

        if (form.mode === 0 && defaultMode === -1) {
            setKeyOptions(minorKeyOptions);
            return;
        }

        setKeyOptions(majorKeyOptions);
    }, [form.mode]);

    return (
        <div className={styles.container}>
            <label>
                {label}:
                <Select
                    name="musician"
                    value={{
                        value:
                            convertKeyModeIntToKey(
                                form ? form[keyProp] : -1,
                                form?.mode
                            ) || '',
                        label:
                            convertKeyModeIntToKey(
                                form ? form[keyProp] : -1,
                                form?.mode
                            ) || '',
                    }}
                    options={keyOptions}
                    className="basic-single"
                    onChange={handleChange}
                    isSearchable={false}
                />
            </label>
            {showIsMinorCheckbox && (
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={form.mode === 0}
                        onChange={toggleMinor}
                    />
                    Minor
                </label>
            )}
        </div>
    );
}
