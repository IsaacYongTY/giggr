import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import Select, { ValueType } from 'react-select';

import CopyToClipboardButton from 'components/common/CopyToClipboardButton';

import Form from 'lib/types/Form';
import generateMetaData from 'lib/utils/generate-metadata';
import convertKeyModeIntToKey from 'lib/utils/convert-key-mode-int-to-key';
import convertRelativeKey from 'lib/utils/convert-relative-key';
import convertKeyToKeyModeInt from 'lib/utils/convert-key-to-key-mode-int';
import {
    defaultPinyinSyllableOption,
    defaultPinyinSyllableOptions,
} from './constants';
import { deriveGoogleSearchLink } from './utils';
import { Option } from './types';

import styles from './MetaToolForm.module.scss';

const cx = classnames.bind(styles);

type MetaToolFormProps = {
    formValue: Form;
    setFormValue: (form: any) => void;
};

export default function MetaToolForm({
    formValue,
    setFormValue,
}: MetaToolFormProps) {
    const [originalTempo, setOriginalTempo] = useState(0);
    const [text, setText] = useState('');

    const [searchLink, setSearchLink] = useState('');
    const [pinyinSyllable, setPinyinSyllable] = useState(
        defaultPinyinSyllableOption
    );
    const [showPinyin, setShowPinyin] = useState(true);

    useEffect(() => {
        const { title, tempo, language }: Form = formValue;

        if (tempo) {
            setOriginalTempo(tempo);
        }

        const metaData = generateMetaData(formValue, pinyinSyllable.value);
        setText(metaData);

        if (title) {
            setSearchLink(deriveGoogleSearchLink(title, language));
        }
    }, [formValue, pinyinSyllable, showPinyin]);

    function toggleTempoAndTimeSignature() {
        if (formValue.timeSignature === '12/8') {
            setFormValue((prevState: any) => ({
                ...prevState,
                tempo: originalTempo * 3,
                timeSignature: '3/4',
            }));
            return;
        }

        setFormValue((prevState: any) => ({
            ...prevState,
            tempo: originalTempo / 3,
            timeSignature: '12/8',
        }));
    }

    function toggleRelativeKey() {
        const keyString = convertKeyModeIntToKey(formValue.key, formValue.mode);
        const relativeKey = convertRelativeKey(keyString);
        const [key, mode] = convertKeyToKeyModeInt(relativeKey);

        setFormValue((prevState: any) => ({ ...prevState, key, mode }));
    }

    function handleChange(selectedOption: ValueType<Option, false>) {
        if (!selectedOption) return;
        setPinyinSyllable(selectedOption);
    }

    const textAreaContainer = useRef<HTMLDivElement>(null);

    function clearSelection() {
        if (textAreaContainer.current) {
            textAreaContainer.current.innerHTML = '';
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('pinyin-row')}>
                <label>
                    <input
                        type="checkbox"
                        defaultChecked={showPinyin}
                        onChange={() =>
                            setShowPinyin((prevState) => !prevState)
                        }
                    />
                    Pinyin
                </label>

                <div className={cx('dropdown')}>
                    <Select
                        value={pinyinSyllable}
                        options={defaultPinyinSyllableOptions}
                        className="basic-single"
                        isSearchable={false}
                        onChange={handleChange}
                    />
                </div>
                {formValue.title && (
                    <>
                        <a
                            href={searchLink}
                            className={cx('search-link')}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Search &quot;{formValue?.title}{' '}
                            {formValue?.language === 'mandarin'
                                ? '歌词'
                                : 'lyrics'}
                            &quot; on Google
                        </a>
                        <label>
                            <input
                                type="checkbox"
                                onClick={toggleRelativeKey}
                            />
                            Relative Key
                        </label>
                    </>
                )}

                {(formValue.timeSignature === '3/4' ||
                    formValue.timeSignature === '12/8') && (
                    <div className={cx('time-signature-toggle-container')}>
                        <button
                            className={cx('toggle', {
                                selected: formValue.timeSignature === '3/4',
                            })}
                            onClick={toggleTempoAndTimeSignature}
                        >
                            3/4
                        </button>
                        <button
                            className={cx('toggle', {
                                selected: formValue.timeSignature === '12/8',
                            })}
                            onClick={toggleTempoAndTimeSignature}
                        >
                            12/8
                        </button>
                    </div>
                )}
            </div>

            <div>
                <span>Result:</span>
                <div
                    contentEditable="true"
                    className={cx('textarea')}
                    ref={textAreaContainer}
                    suppressContentEditableWarning={true}
                >
                    {Object.keys(formValue).length ? text : null}
                </div>
            </div>

            <div className={cx('button-row-container')}>
                <button
                    className="btn btn-danger-outlined"
                    onClick={clearSelection}
                >
                    Clear
                </button>
                <CopyToClipboardButton sourceRef={textAreaContainer} />
            </div>
        </div>
    );
}
