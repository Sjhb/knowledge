var letterCombinations = function(digits) {
    if (!digits) {
        return [];
    }
    let res = [];
    let startCharCode = 'a'.charCodeAt(0);
    let len = digits.length;
    function backTrack (path = [], i = 0) {
        if (i === len) {
            res.push(path);
            return;
        }
        let num = Number(digits[i]);
        let startChar = startCharCode + (num - 2) * 3;
        let index = 0;
        while (index < 3) {
            backTrack([...path, String.fromCharCode(startChar + index)], i + 1);
            index++;
        }
    }
    backTrack();
    return res;
};
console.log(letterCombinations("2345"))