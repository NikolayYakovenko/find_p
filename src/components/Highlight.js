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

    // Match at the beginning of each new word
    const sep = /[-,.;:?\s]+/;

    const singleTextWords = textLow.split(sep);
    let fromIndex = 0;

    const singleTextWordsWithPos = singleTextWords.map((s) => {
        const indexInWord = textLow.indexOf(s, fromIndex);
        fromIndex = indexInWord;

        return {
            word: s,
            index: indexInWord,
        };
    });

    searchWords.forEach((sw) => {
        const searchWord = sw.toLowerCase();
        // Do it for every single text word
        singleTextWordsWithPos.forEach((textWord) => {
            if (textWord.word.includes(searchWord)) {
                const start = textWord.word.indexOf(searchWord) + textWord.index;
                const end = start + searchWord.length;
                chunks.push({
                    start,
                    end,
                });
            }
        });

        // The complete word including whitespace should also be handled, e.g.
        // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
        if (textLow.startsWith(searchWord)) {
            const start = 0;
            const end = searchWord.length;
            chunks.push({
                start,
                end,
            });
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
            // findChunks={findChunksLastChars}
        />
    );
}

Highlight.propTypes = {
    searchWords: PropTypes.array.isRequired,
    textToHighlight: PropTypes.string,
};
