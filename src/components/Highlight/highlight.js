import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

import './highlight.css';


export function Highlight(props) {
    const { searchWords, textToHighlight } = props;

    return (
        <Highlighter
            searchWords={searchWords}
            textToHighlight={textToHighlight}
            autoEscape
            highlightClassName='highlighted'
            findChunks={() => props.indexesForHighlight}
        />
    );
}

Highlight.propTypes = {
    searchWords: PropTypes.array.isRequired,
    textToHighlight: PropTypes.string,
    indexesForHighlight: PropTypes.array,
};
