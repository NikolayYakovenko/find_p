// regexp to find non letter symbols
export const regExp = /[.,?\-:;=+#%()&$№"`'_/*\s]+/;

export function findChunksToHighlight(searchWords, text) {
    const chunks = [];
    const uniquePalindromes = new Set();
    const textLower = text.toLowerCase();

    searchWords.forEach((word) => {
        const searchWord = word.toLowerCase();
        const searchWordLength = searchWord.length;

        for (let i = 0; i < textLower.length; i += 1) {
            // indexes where highlight starts and stops
            let startIndex = i;
            let endIndex = 0;

            // get from initial text a chunk with length equal to searchWord length
            let chunk = textLower.substr(i, searchWordLength);

            let q = i;
            while (
                chunk[0] === searchWord[0] &&
                chunk.length === searchWordLength &&
                chunk.match(regExp)
            ) {
                // increase start position if the first symbol matches regExp
                // , - ololo -> comma, spaces and hyphen - should not be treated as start position
                if (chunk[0].match(regExp)) {
                    startIndex += 1;
                }

                const indexOfCharToReplace = chunk.match(regExp).index;
                const charToReplace = chunk.charAt(indexOfCharToReplace);

                if (indexOfCharToReplace > -1) {
                    chunk = chunk.replace(charToReplace, '');

                    // if there were some non letter symbols we replaced before
                    // and chunk length has changed
                    // we should take the next one to keep length the same
                    if (chunk.length < searchWordLength) {
                        const nextCharIndex = chunk.length + q + 1;
                        const char = textLower.charAt(nextCharIndex);

                        chunk = `${chunk}${char}`;

                        // shift end position of highlight to right
                        endIndex += 1;
                    }
                }
                q += 1;
            }

            if (chunk === searchWord && !uniquePalindromes.has(chunk)) {
                endIndex = searchWordLength + endIndex + i;
                chunks.push({
                    start: startIndex,
                    end: endIndex,
                });
                uniquePalindromes.add(chunk);
            }
        }
    });

    return chunks;
}
