import React, { useEffect, useState } from 'react';
import { hyphenateSync } from 'hyphen/en-gb';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '../../components/layouts/Layout';
import Tag from '../../components/common/Tag';
import withAuth from '../../middlewares/withAuth';

import addSpaceBetweenChineseWords from '../../lib/utils/add-space-between-chinese-words';
import removeCharacters from '../../lib/utils/remove-characters';
import replaceCharactersWithPlaceholders from '../../lib/utils/replace-characters-with-placeholders';

import styles from '../../assets/scss/pages/_lead-sheet-spacing.module.scss';

interface GetServerSidePropsContextWithUser extends GetServerSidePropsContext {
    req: IncomingMessage & {
        user: any;
        cookies: NextApiRequestCookies;
    };
}

interface Props {
    user: any;
}
export const getServerSideProps: GetServerSideProps = withAuth(
    async ({ req }: GetServerSidePropsContextWithUser) => {
        return {
            props: {
                user: req.user,
            },
        };
    }
);

export default function LeadSheetSpacing({ user }: Props) {
    const [inputText, setInputText] = useState('');
    const [resultText, setResultText] = useState('');
    const [isAddHyphen, setIsAddHyphen] = useState(true);
    const [isRemoveStrings, setIsRemoveStrings] = useState(true);
    const [stringToRemove, setStringToRemove] = useState('');
    const [stringsToRemoveArray, setStringsToRemoveArray] = useState<string[]>(
        []
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

            const result = addSpaceBetweenChineseWords(cleanedInput);

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
        <Layout user={user} title="Lead Sheet Spacing">
            <div className={styles.container}>
                <div className={styles.textAreaContainer}>
                    <div>
                        <label>
                            <div>Input:</div>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        </label>

                        <div className={styles.buttonRow}>
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

                        <div className={styles.buttonRow}>
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

                <div className={styles.option}>
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
                        <div className={styles.addStringInput}>
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

                    <ul className={styles.stringToRemoveList}>
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
}
