function checkPalindromes(string, firstIndex, lastIndex, arr) {
    let first = firstIndex;
    let last = lastIndex;

    while (first >= 0 && last < string.length && string.charAt(first) === string.charAt(last)) {
        const result = string.slice(first, last + 1);
        if (result.length > 1) {
            arr.add(result);
        }
        first -= 1;
        last += 1;
    }
}


function formatString(string) {
    return string.toLowerCase().replace(/[^A-Za-zА-Яа-я]/gi, '');
}


export function getAllPalindromes(string) {
    const arr = new Set();
    const s = formatString(string);

    for (let j = 0; j < s.length; j += 1) {
        checkPalindromes(s, j, j, arr);
        checkPalindromes(s, j, j + 1, arr);
    }

    return Array.from(arr);
}


export function getLongestPalindrome(str) {
    let s = formatString(str);
    s = `#${s.split('').join('#')}#'`;

    let maxRight = 0;
    let pos = 0;
    let center = 0;
    let maxR = 1;
    const RL = new Array(s.length);

    for (let i = 0; i < s.length; i += 1) {
        if (maxRight > i) {
            RL[i] = Math.min(RL[(2 * pos) - i], maxRight - i);
        } else {
            RL[i] = 0;
        }

        while (i + RL[i] < s.length && i - RL[i] >= 0 && s[i + RL[i]] === s[i - RL[i]]) {
            RL[i] += 1;
        }

        if (RL[i] + i > maxRight) {
            maxRight = RL[i] + i;
            pos = i;
        }

        if (RL[i] > maxR) {
            center = i;
            maxR = RL[i];
        }
    }

    return s.slice(center - maxR + 1, center + maxR).split('#').join('');
}
