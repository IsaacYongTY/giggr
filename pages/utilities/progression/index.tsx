import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Select, { ValueType } from 'react-select';
import classnames from 'classnames/bind';

import Layout from 'components/Layout';
import KeysDropdown from 'components/common/KeysDropdown';
import {
    generateFullBarProgression,
    generateHalfBarProgression,
    checkIsValidProgression,
} from './utils';
import { keyMap, progressionOptions, spacingOptions } from './constants';
import CopyToClipboardButton from 'components/common/CopyToClipboardButton';
import AlertBox from 'components/common/AlertBox';
import withAuth from 'middlewares/withAuth';

import styles from './progression.module.scss';

const cx = classnames.bind(styles);

interface OptionType {
    value: string;
    label: string;
}

interface SpacingOptionType {
    value: number;
    label: number;
}

type ProgressionPageProps = {
    user: any;
};

export const getServerSideProps: GetServerSideProps = withAuth(
    async ({ req }: any) => {
        return {
            props: {
                user: req.user,
            },
        };
    }
);

type ProgressionData = {
    key: number;
    progression: string;
    isFullBar: boolean;
    spaces: number;
};

export default function ProgressionPage({ user }: ProgressionPageProps) {
    const defaultKey = useMemo(() => keyMap[0], []);

    const [progressionData, setProgressionData] = useState<ProgressionData>({
        key: defaultKey.id,
        progression: '',
        isFullBar: true,
        spaces: 12,
    });

    const [progression, setProgression] = useState('');

    const [alertOptions, setAlertOptions] = useState({ message: '', type: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const textarea = useRef<HTMLTextAreaElement>(null);

    function handleChange(selectedOption: ValueType<OptionType, false>) {
        if (!selectedOption) {
            return;
        }

        setProgressionData((prevState) => ({
            ...prevState,
            progression: selectedOption.value,
        }));
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;
        setProgressionData((prevState) => ({
            ...prevState,
            [e.target.name]: newValue,
        }));
    }

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.name === 'fullBar') {
            setProgressionData((prevState) => ({
                ...prevState,
                spaces: 12,
                isFullBar: true,
            }));
            return;
        }
        setProgressionData((prevState) => ({
            ...prevState,
            spaces: 14,
            isFullBar: false,
        }));
    }

    function handleGenerateProg() {
        const { key, progression, isFullBar, spaces } = progressionData;

        if (!spaces || key === undefined) {
            setErrorMessage('Invalid inputs');
            return;
        }

        try {
            checkIsValidProgression(progression);

            const generatedProg = isFullBar
                ? generateFullBarProgression(key, progression, spaces)
                : generateHalfBarProgression(key, progression, spaces);

            setProgression((prevState) => prevState + generatedProg + '\n\n');

            setErrorMessage('');
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    function handleSpacingChanges(
        selectedOption: ValueType<SpacingOptionType, false>
    ) {
        if (!selectedOption) {
            return;
        }
        setProgressionData((prevState) => ({
            ...prevState,
            spaces: selectedOption.value,
        }));
    }

    function handleClear() {
        setProgression('');
        setErrorMessage('');
    }

    return (
        <Layout title="Progression Generator" user={user}>
            <div className={cx('container')}>
                <div className={cx('input-row')}>
                    <div className={cx('keys-dropdown-container')}>
                        <KeysDropdown
                            label="Key"
                            form={progressionData}
                            setForm={setProgressionData}
                            defaultKey={defaultKey.key}
                            showIsMinorCheckbox={false}
                        />
                    </div>

                    <div className={cx('prog-dropdown-container')}>
                        <label>
                            Common Progressions:
                            <Select
                                className="basic-single"
                                value={progressionOptions.find(
                                    (option) =>
                                        option.value ===
                                        progressionData.progression
                                )}
                                options={progressionOptions}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className={cx('input-container')}>
                        <label>
                            <div>Input:</div>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="1b73M4m5251..."
                                value={progressionData.progression}
                                name="progression"
                                onChange={handleInputChange}
                            />

                            {errorMessage && (
                                <div className="error-message">
                                    * {errorMessage}
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                <div className={cx('radio-row')}>
                    <label>
                        <input
                            type="radio"
                            name="fullBar"
                            onChange={handleRadioChange}
                            checked={progressionData.isFullBar}
                        />
                        <span>Full bar</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="halfBar"
                            onChange={handleRadioChange}
                            checked={!progressionData.isFullBar}
                        />
                        <span>Half bar</span>
                    </label>

                    <label>
                        Spaces:
                        <div className={cx('spacing-dropdown-container')}>
                            <Select
                                className="basic-single"
                                value={{
                                    value: progressionData.spaces || 0,
                                    label: progressionData.spaces || 0,
                                }}
                                name="spaces"
                                options={spacingOptions}
                                onChange={handleSpacingChanges}
                            />
                        </div>
                    </label>
                </div>

                <div className={cx('text-area-container')}>
                    <label>
                        <div>Result:</div>
                        <textarea
                            ref={textarea}
                            className={`${cx('textarea')} form-control`}
                            value={progression}
                            onChange={(e) => setProgression(e.target.value)}
                        />
                    </label>
                </div>

                <div className={cx('button-row')}>
                    <button
                        className="btn btn-danger-outlined"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                    <CopyToClipboardButton sourceRef={textarea} />
                    <button
                        className="btn btn-primary"
                        onClick={handleGenerateProg}
                    >
                        Generate
                    </button>
                </div>

                <AlertBox
                    setAlertOptions={setAlertOptions}
                    message={alertOptions.message}
                    type={alertOptions.type}
                />
            </div>
        </Layout>
    );
}
