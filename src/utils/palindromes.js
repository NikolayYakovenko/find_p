import { findChunksToHighlight } from '../utils/highlight';


function formatString(string) {
    const re = /[.,?\-:;=+#%()&$№"_/*\s]/gi;
    return string.toLowerCase().split(re).filter(text => text !== '');
}

function isPalindromeCheck(text) {
    const textLen = text.length;
    const minPalindromLength = 3;
    const textCenter = Math.floor(textLen / 2);

    if (!text || textLen < minPalindromLength) {
        return false;
    }

    for (let i = 0; i < textCenter; i += 1) {
        const charFromLeft = text[i];
        const charFromRight = text[textLen - 1 - i];

        if (charFromLeft !== charFromRight) {
            return false;
        }
    }

    return true;
}


function getAllPalindromes(text) {
    const uniquePalindromes = new Set();
    const formatedText = formatString(text);
    const formatedTextLen = formatedText.length;

    for (let i = 0; i < formatedTextLen; i += 1) {
        // check for current word
        if (isPalindromeCheck(formatedText[i])) {
            uniquePalindromes.add(formatedText[i]);
        }

        // check for combination of words coming one after another
        let nextWordIndex = i + 1;
        let currentWord = formatedText[i];
        while (nextWordIndex < formatedTextLen) {
            const nextWord = formatedText[nextWordIndex];
            if (nextWord) {
                currentWord = `${currentWord}${nextWord}`;
                if (isPalindromeCheck(currentWord)) {
                    uniquePalindromes.add(currentWord);
                }
            }
            nextWordIndex += 1;
        }
    }

    return Array.from(uniquePalindromes);
}


export function getAllPalindromesData(text) {
    const allPalindromes = getAllPalindromes(text);
    let longestPalindrom;
    let longestPalindromLen = 0;

    // palindrom indexes in original text
    const indexes = findChunksToHighlight(allPalindromes, text);

    const allPalindromesWithoutFormating = indexes.map((item) => {
        const { start, end } = item;
        const palindrom = text.substring(start, end);

        if (palindrom.length >= longestPalindromLen) {
            longestPalindrom = palindrom;
            longestPalindromLen = palindrom.length;
        }

        return palindrom;
    });

    return {
        allPalindromes: allPalindromesWithoutFormating,
        longestPalindrom,
        indexes,
    };
}
