function formatString(string) {
    return string.toLowerCase().replace(/[^A-Za-zА-Яа-я]/gi, '');
}

function isPalindromeCheck(string, firstIndex, lastIndex, uniquePalindromes) {
    let first = firstIndex;
    let last = lastIndex;

    while (first >= 0 && last < string.length && string.charAt(first) === string.charAt(last)) {
        const result = string.slice(first, last + 1);
        if (result.length > 1) {
            uniquePalindromes.add(result);
        }
        first -= 1;
        last += 1;
    }
}


function getAllPalindromes(string) {
    const uniquePalindromes = new Set();
    const formatedString = formatString(string);

    for (let i = 0; i < formatedString.length; i += 1) {
        isPalindromeCheck(formatedString, i, i, uniquePalindromes);
        isPalindromeCheck(formatedString, i, i + 1, uniquePalindromes);
    }

    return Array.from(uniquePalindromes);
}


export function getAllPalindromesData(string) {
    const allPalindromes = getAllPalindromes(string);
    const longestPalindromLen = Math.max(...(allPalindromes.map(p => p.length)));
    const longestPalindrom = allPalindromes.find(p => p.length === longestPalindromLen);

    return {
        allPalindromes,
        longestPalindrom,
    };
}
