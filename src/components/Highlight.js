import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

const findChunksLastChars = ({
    // autoEscape,
    // caseSensitive,
    // sanitize,
    searchWords,
    textToHighlight,
}) => {
    const chunks = [];
    const textLow = textToHighlight.toLowerCase();

    searchWords.forEach((sw) => {
        const searchWord = sw.toLowerCase();

        for (let i = 0; i <= textLow.length; i += 1) {
            let end = 0;
            let slice = textLow.substr(i, searchWord.length + 1);
            const re = /\.|,|\?|-|:|\s+/;

            let q = i;
            while (slice.match(re)) {
                const indexOfSpace = slice.match(re).index;
                const charSym = slice.charAt(indexOfSpace);

                if (indexOfSpace > -1) {
                    slice = slice.replace(charSym, '');

                    if (slice.length < searchWord.length) {
                        const char = textLow.charAt(slice.length + q + 1);
                        slice = `${slice}${char}`;
                    }
                    end += 1;
                }
                q += 1;
            }

            if (slice === searchWord) {
                const start = i;
                end = end + start + searchWord.length;

                chunks.push({
                    start,
                    end,
                });
            }
        }
    });

    return chunks;
};

export function Highlight(props) {
    const { searchWords, textToHighlight } = props;

    return (
        <Highlighter
            searchWords={searchWords}
            textToHighlight={textToHighlight}
            autoEscape
            findChunks={findChunksLastChars}
        />
    );
}

Highlight.propTypes = {
    searchWords: PropTypes.array.isRequired,
    textToHighlight: PropTypes.string,
};
