import { findChunksToHighlight, regExp } from './highlight';

function splitTextOnWords(string) {
    return string
        .toLowerCase()
        .split(regExp)
        .filter((text) => text !== '');
}

function isPalindromeCheck(text) {
    const textLen = text.length;
    const minPalindromeLength = 3;
    const textCenter = Math.floor(textLen / 2);

    if (!text || textLen < minPalindromeLength) {
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
    const words = splitTextOnWords(text);
    const wordsLength = words.length;

    for (let i = 0; i < wordsLength; i += 1) {
        // check for current word
        if (isPalindromeCheck(words[i])) {
            uniquePalindromes.add(words[i]);
        }

        // check for combination of words coming one after another
        let nextWordIndex = i + 1;
        let currentWord = words[i];

        while (nextWordIndex < wordsLength) {
            const nextWord = words[nextWordIndex];
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
    let longestPalindrome = '';
    let longestPalindromeLength = 0;

    // palindrome indexes in original text
    const indexes = findChunksToHighlight(allPalindromes, text);

    const allPalindromesWithoutFormatting = indexes.map((item) => {
        const { start, end } = item;
        const palindrome = text.substring(start, end);

        if (palindrome.length >= longestPalindromeLength) {
            longestPalindrome = palindrome;
            longestPalindromeLength = palindrome.length;
        }

        return palindrome;
    });

    return {
        allPalindromes: allPalindromesWithoutFormatting,
        longestPalindrome,
        indexes,
    };
}
