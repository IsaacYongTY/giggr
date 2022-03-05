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
import convertKeyToKeyModeInt from 'lib/utils/convert-key-to-key-mode-int';
import convertKeyModeIntToKey from 'lib/utils/convert-key-mode-int-to-key';

const cx = classnames.bind(styles);

interface OptionType {
    value: string;
    label: string;
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

export default function ProgressionPage({ user }: ProgressionPageProps) {
    const defaultKey = useMemo(() => keyMap[0], []);

    const [key, setKey] = useState(defaultKey.id);

    const [isFullBar, setIsFullBar] = useState(true);
    const [spaces, setSpaces] = useState(12);
    const [progression, setProgression] = useState('');

    const [displayedText, setDisplayedText] = useState('');

    const [alertOptions, setAlertOptions] = useState({ message: '', type: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const textarea = useRef<HTMLTextAreaElement>(null);

    function handleChange(selectedOption: ValueType<OptionType, false>) {
        if (!selectedOption) {
            return;
        }

        setProgression(selectedOption.value);
    }

    const handleProgressionInputChange = (progressionInput: string) => {
        setProgression(progressionInput);
    };

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.name);
        console.log(isFullBar);
        console.log(e.target.name === 'fullBar');
        if (e.target.name === 'fullBar') {
            console.log('in');
            setSpaces(12);
            setIsFullBar(true);
            return;
        }

        setSpaces(14);
        setIsFullBar(false);
    }

    function handleGenerateProgression() {
        // const { key, progression, isFullBar, spaces } = progressionData;
        console.log(progression);
        if (!spaces || key === undefined) {
            setErrorMessage('Invalid inputs');
            return;
        }

        try {
            checkIsValidProgression(progression);

            const generatedProgression = isFullBar
                ? generateFullBarProgression(key, progression, spaces)
                : generateHalfBarProgression(key, progression, spaces);

            setDisplayedText(
                (prevState) => prevState + generatedProgression + '\n\n'
            );
            setErrorMessage('');
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    function handleSpacingChanges(spaces: number) {
        setSpaces(spaces);
    }

    function handleClear() {
        setDisplayedText('');
        setErrorMessage('');
    }

    const handleKeysDropdownChange = (keyString: string) => {
        const [selectedKey] = convertKeyToKeyModeInt(keyString);

        setKey(selectedKey);
    };
    return (
        <Layout title="Progression Generator" user={user}>
            <div className={cx('container')}>
                <div className={cx('input-row')}>
                    <div className={cx('keys-dropdown-container')}>
                        <KeysDropdown
                            label="Key"
                            selectedKey={convertKeyModeIntToKey(key, 1)} // minor major is irrelevant here
                            handleKeysDropdownChange={handleKeysDropdownChange}
                            showIsMinorCheckbox={false}
                        />
                    </div>

                    <div className={cx('prog-dropdown-container')}>
                        <label>
                            Common Progressions:
                            <Select
                                className="basic-single"
                                value={progressionOptions.find(
                                    (option) => option.value === progression
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
                                value={progression}
                                name="progression"
                                onChange={(e) =>
                                    handleProgressionInputChange(e.target.value)
                                }
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
                            checked={isFullBar}
                        />
                        <span>Full bar</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="halfBar"
                            onChange={handleRadioChange}
                            checked={!isFullBar}
                        />
                        <span>Half bar</span>
                    </label>

                    <label>
                        Spaces:
                        <div className={cx('spacing-dropdown-container')}>
                            <Select
                                className="basic-single"
                                value={{
                                    value: spaces || 0,
                                    label: spaces || 0,
                                }}
                                name="spaces"
                                options={spacingOptions}
                                onChange={(e) =>
                                    handleSpacingChanges(e?.value || 0)
                                }
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
                            value={displayedText}
                            spellCheck={false}
                            onChange={(e) => setDisplayedText(e.target.value)}
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
                        onClick={handleGenerateProgression}
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
