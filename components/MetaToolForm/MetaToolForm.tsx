import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import Select, { ValueType } from 'react-select';

import CopyToClipboardButton from 'components/CopyToClipboardButton';

import { generateMetadataText } from './utils';
import { MetatoolSongMetadata } from 'common/types';
import { defaultPinyinSyllableOptions } from './constants';
import { deriveGoogleSearchLink, deriveGoogleSearchText } from './utils';
import { Option } from './types';

import styles from './MetaToolForm.module.scss';

const cx = classnames.bind(styles);

type MetaToolFormProps = {
    metadata: MetatoolSongMetadata;
    handleMetadataChange?: (metadata: MetatoolSongMetadata) => void;
};

export default function MetaToolForm({ metadata }: MetaToolFormProps) {
    const [displayedMetadata, setDisplayedMetadata] = useState('');

    const [searchLink, setSearchLink] = useState('');
    const [pinyinSyllableOption, setPinyinSyllableOption] = useState(
        defaultPinyinSyllableOptions[1],
    );
    const [showPinyin, setShowPinyin] = useState(true);

    useEffect(() => {
        const { title, language } = metadata;

        const metaData = generateMetadataText(
            metadata,
            pinyinSyllableOption.value,
        );
        setDisplayedMetadata(metaData);

        setSearchLink(title ? deriveGoogleSearchLink(title, language) : '');
    }, [metadata, pinyinSyllableOption, showPinyin]);

    function handleChange(selectedOption: ValueType<Option, false>) {
        if (!selectedOption) return;
        setPinyinSyllableOption(selectedOption);
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
                        value={pinyinSyllableOption}
                        options={defaultPinyinSyllableOptions}
                        className="basic-single"
                        isSearchable={false}
                        onChange={handleChange}
                    />
                </div>
                {metadata.title && (
                    <>
                        <a
                            href={searchLink}
                            className={cx('search-link')}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {deriveGoogleSearchText(
                                metadata.title,
                                metadata.language,
                            )}
                        </a>
                    </>
                )}

                {/*{(metadata.timeSignature === '3/4' ||*/}
                {/*    metadata.timeSignature === '12/8') && (*/}
                {/*    <div className={cx('time-signature-toggle-container')}>*/}
                {/*        <button*/}
                {/*            className={cx('toggle', {*/}
                {/*                selected: metadata.timeSignature === '3/4',*/}
                {/*            })}*/}
                {/*            onClick={toggleTempoAndTimeSignature}*/}
                {/*        >*/}
                {/*            3/4*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            className={cx('toggle', {*/}
                {/*                selected: metadata.timeSignature === '12/8',*/}
                {/*            })}*/}
                {/*            onClick={toggleTempoAndTimeSignature}*/}
                {/*        >*/}
                {/*            12/8*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

            <div>
                <span>Result:</span>
                <div
                    contentEditable="true"
                    className={cx('textarea')}
                    ref={textAreaContainer}
                    suppressContentEditableWarning={true}
                >
                    {metadata.title && Object.keys(metadata).length
                        ? displayedMetadata
                        : null}
                </div>
            </div>

            <div className={cx('button-row')}>
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
