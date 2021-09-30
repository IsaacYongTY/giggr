import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import classnames from 'classnames/bind';

import Select, { ValueType } from 'react-select';

import Form from '../../../lib/types/Form';
import generateMetaData from '../../../lib/utils/generate-metadata';
import CopyToClipboardButton from '../CopyToClipboardButton/CopyToClipboardButton';

import convertKeyModeIntToKey from '../../../lib/utils/convert-key-mode-int-to-key';
import convertRelativeKey from '../../../lib/utils/convert-relative-key';
import convertKeyToKeyModeInt from '../../../lib/utils/convert-key-to-key-mode-int';

import styles from './MetaToolForm.module.scss';

const cx = classnames.bind(styles);

interface Props {
    formValue: Form;
    setFormValue: Dispatch<SetStateAction<Form>>;
    setAlertOptions: Dispatch<
        SetStateAction<{ message: string; type: string }>
    >;
}

interface Option {
    value: number;
    label: string;
}

export default function MetaToolForm({
    formValue,
    setFormValue,
    setAlertOptions,
}: Props) {
    const [originalTempo, setOriginalTempo] = useState(0);
    const [text, setText] = useState('');

    const [searchLink, setSearchLink] = useState('');
    const [pinyinSyllable, setPinyinSyllable] = useState({
        value: 2,
        label: '2',
    });
    const [showPinyin, setShowPinyin] = useState(true);

    const threeFourToggleRef = useRef<HTMLButtonElement>(null);
    const twelveEightToggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const { title, tempo, language }: Form = formValue;

        if (tempo) {
            setOriginalTempo(tempo);
        }

        const metaData = generateMetaData(formValue, pinyinSyllable.value);
        setText(metaData);

        if (title) {
            setSearchLink(
                `https://www.google.com/search?q=${title}%20${
                    language === 'mandarin' ? '歌词' : 'lyrics'
                }`
            );
        }
    }, [formValue, pinyinSyllable, showPinyin]);

    useEffect(() => {
        formValue.timeSignature === '3/4'
            ? threeFourToggleRef?.current?.classList.add(styles.selected)
            : twelveEightToggleRef?.current?.classList.add(styles.selected);
    }, []);

    function toggleTempoAndTimeSignature() {
        if (formValue.timeSignature === '12/8') {
            threeFourToggleRef?.current?.classList.add(styles.selected);
            twelveEightToggleRef?.current?.classList.remove(styles.selected);
            setFormValue((prevState: any) => ({
                ...prevState,
                tempo: originalTempo * 3,
                timeSignature: '3/4',
            }));
            return;
        }

        twelveEightToggleRef?.current?.classList.add(styles.selected);
        threeFourToggleRef?.current?.classList.remove(styles.selected);
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
            setAlertOptions({
                message: 'Content cleared',
                type: 'success',
            });
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
                        options={[
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: 99, label: 'All' },
                        ]}
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
                            className={cx('toggle')}
                            ref={threeFourToggleRef}
                            onClick={toggleTempoAndTimeSignature}
                        >
                            3/4
                        </button>
                        <button
                            className={cx('toggle')}
                            ref={twelveEightToggleRef}
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
                <CopyToClipboardButton
                    sourceRef={textAreaContainer}
                    setAlertOptions={setAlertOptions}
                />
            </div>
        </div>
    );
}
