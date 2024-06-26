import React, { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { hyphenateSync } from 'hyphen/en-gb';
import { GetServerSideProps } from 'next';

import Layout from 'components/Layout';
import Tag from 'components/Tag';
import withAuth from 'middlewares/withAuth';

import {
    addSpaceBetweenChineseCharacters,
    removeCharacters,
    replaceCharactersWithPlaceholders,
} from './utils';

import styles from './LeadSheetSpacingPage.module.scss';

const cx = classnames.bind(styles);

type LeadSheetSpacingPageProps = {
    user: any;
};

export const getServerSideProps: GetServerSideProps = withAuth(
    async ({ req }: any) => {
        // ignore type for now, failed due to Next 12 upgrade
        return {
            props: {
                user: req.user,
            },
        };
    },
);

const LeadSheetSpacingPage: React.FC<LeadSheetSpacingPageProps> = () => {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [isAddHyphen, setIsAddHyphen] = useState(true);
    const [isRemoveStrings, setIsRemoveStrings] = useState(true);
    const [stringToRemove, setStringToRemove] = useState('');
    const [stringsToRemoveArray, setStringsToRemoveArray] = useState<string[]>(
        [],
    );

    const [isShowPlaceholderText, setIsShowPlaceholderText] = useState(false);
    const [placeholderText, setPlaceholderText] = useState('');

    function toggleAddHyphen() {
        setIsAddHyphen((prevState) => !prevState);
    }

    function toggleRemoveStrings() {
        setIsRemoveStrings((prevState) => !prevState);
    }
    function handleProcessText() {
        setIsShowPlaceholderText(false);
        try {
            let cleanedInput = isRemoveStrings
                ? removeCharacters(stringsToRemoveArray, inputText)
                : inputText;

            cleanedInput = isAddHyphen
                ? hyphenateSync(cleanedInput, { hyphenChar: '-' })
                : cleanedInput;

            const result = addSpaceBetweenChineseCharacters(cleanedInput);

            setResultText(result);
        } catch (error) {
            console.log(error);
        }
    }

    function handleClearAll() {
        setInputText('');
        setResultText('');
    }

    function handleClearResult() {
        setResultText('');
    }

    function handleSetStringToRemove() {
        const isInStringToRemoveArray =
            stringsToRemoveArray.indexOf(stringToRemove) > -1;

        if (isInStringToRemoveArray) {
            setStringToRemove('');
            return;
        }

        setStringsToRemoveArray((prevState) => [...prevState, stringToRemove]);
        const temp = [...stringsToRemoveArray, stringToRemove];
        localStorage.setItem('strings-to-remove', JSON.stringify(temp));
        setStringToRemove('');
    }

    function togglePlaceholderText() {
        if (!isShowPlaceholderText) {
            setIsShowPlaceholderText(true);
            setPlaceholderText(replaceCharactersWithPlaceholders(resultText));
            return;
        }

        setIsShowPlaceholderText(false);
        setPlaceholderText('');
    }

    useEffect(() => {
        const tempJSON = localStorage.getItem('strings-to-remove');
        if (tempJSON) {
            setStringsToRemoveArray(JSON.parse(tempJSON));
        }
    }, []);

    return (
        <Layout title="Lead Sheet Spacing">
            <div className={cx('container')}>
                <div className={cx('text-area-container')}>
                    <div>
                        <label>
                            <div>Input:</div>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        </label>

                        <div className={cx('button-row')}>
                            <button
                                className="btn btn-primary"
                                onClick={handleProcessText}
                            >
                                Process
                            </button>
                            <button
                                className="btn btn-danger-outlined"
                                onClick={handleClearAll}
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    <div>
                        <label>
                            <div>Result:</div>
                            <textarea
                                value={
                                    isShowPlaceholderText
                                        ? placeholderText
                                        : resultText
                                }
                                onChange={(e) =>
                                    isShowPlaceholderText
                                        ? setPlaceholderText(e.target.value)
                                        : setResultText(e.target.value)
                                }
                            />
                        </label>

                        <div className={cx('button-row')}>
                            <button
                                className="btn btn-secondary"
                                onClick={togglePlaceholderText}
                            >
                                Toggle Placeholder
                            </button>
                            <button
                                className="btn btn-danger-outlined"
                                onClick={handleClearResult}
                            >
                                Clear Result
                            </button>
                        </div>
                    </div>
                </div>

                <div className={cx('option')}>
                    <h3>Options</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAddHyphen}
                            onChange={toggleAddHyphen}
                        />
                        <span>Add Hyphen between Syllables (testing)</span>
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={isRemoveStrings}
                            onChange={toggleRemoveStrings}
                        />
                        <span>Remove selected strings</span>
                    </label>

                    <label>
                        <div>Add string to remove:</div>
                        <div className={cx('add-string-input')}>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setStringToRemove(e.target.value)
                                }
                                className="form-control"
                                value={stringToRemove}
                            />
                            <button
                                className="btn btn-secondary"
                                onClick={handleSetStringToRemove}
                            >
                                Add
                            </button>
                        </div>
                    </label>

                    <ul className={cx('string-to-remove-list')}>
                        {stringsToRemoveArray?.map((str, index) => (
                            <Tag
                                key={index}
                                label={str}
                                setStringToRemoveArray={setStringsToRemoveArray}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default LeadSheetSpacingPage;
