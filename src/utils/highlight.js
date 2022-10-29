// regexp to find non letter symbols
const re = /[.,?\-:;=+#%()&$№"_/*\s]+/;

export function findChunksToHighlight(searchWords, text) {
    const chunks = [];
    const uniquePalindromes = new Set();
    const textLower = text.toLowerCase();

    searchWords.forEach((word) => {
        const searchWord = word.toLowerCase();

        for (let i = 0; i < textLower.length; i += 1) {
            // indexes where highlight starts and finishes
            let start = i;
            let end = 0;

            // get from initial text a chunk with length equal to searchWord length
            let chunk = textLower.substr(i, searchWord.length);

            let q = i;
            while (
                chunk[0] === searchWord[0] &&
                chunk.length === searchWord.length &&
                chunk.match(re)
            ) {
                // increase start position if the first symbol matches re
                // , - ololo -> comma, spaces and hyphen - should not be treated as start position
                if (chunk[0].match(re)) {
                    start += 1;
                }

                const indexOfCharToReplace = chunk.match(re).index;
                const charToReplace = chunk.charAt(indexOfCharToReplace);

                if (indexOfCharToReplace > -1) {
                    chunk = chunk.replace(charToReplace, '');

                    // if there were some non letter symbols we replaced before
                    // and chunk length has changed
                    // we should take the next one to keep length the same
                    if (chunk.length < searchWord.length) {
                        const nextCharIndex = chunk.length + q + 1;
                        const char = textLower.charAt(nextCharIndex);

                        chunk = `${chunk}${char}`;

                        // shift end position of highlight to right
                        end += 1;
                    }
                }
                q += 1;
            }

            if (chunk === searchWord && !uniquePalindromes.has(chunk)) {
                end = searchWord.length + end + i;
                chunks.push({
                    start,
                    end,
                });
                uniquePalindromes.add(chunk);
            }
        }
    });

    return chunks;
}
git remote set-url origin https://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@github.com/NikolayYakovenko/find_p.git
