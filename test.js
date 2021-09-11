var makesquare = function(matchsticks) {
    let totalLength = matchsticks.reduce((memo, item) => item+memo, 0);
    if (matchsticks.length < 4 || totalLength%4!==0) return false
    let width = totalLength / 4;
    let nums = [...matchsticks];
    function backTrack (path, lastIndex = 0, sum = 0, arr = nums) {
        if (sum === width) {
            let tempNums = arr.filter((e, index) => !path.includes(index));
            if (tempNums.length === 0) return true
            let total = tempNums.reduce((memo, item) => memo + item, 0)
            if (total < width) return false
            let ans = backTrack([], 0,0,tempNums);
            console.log(ans, width, tempNums)
            return ans;
        }
        let index = lastIndex;
        let flag = false;
        while (index < arr.length) {
            console.log(index, width, arr)
            if (arr[index] + sum <= width) {
                let ans = backTrack([...path, index], index + 1, sum + arr[index], arr);
                if(ans) {
                    flag = true
                }
            }
            index++;
        }
        return flag;
    }
    return backTrack([], 0, 0);
};
console.log(makesquare([4,4,4,4, 4,4,4,4, 4,4,4,4, 4,4,8]))

function quickSort (arr) {
    let innerArr = [...arr];
    function run (start = 0, end = innerArr.length -1) {
        if (start >= end) return;
        let left = start, right = end;
        let midVal = innerArr[right];
        while (left < right) {
            while (left <right && innerArr[left] <= midVal) {
                left++;
            }
            innerArr[right] = innerArr[left]
            while (left <right && innerArr[right] >= midVal) {
                right--;
            }
            innerArr[left] = innerArr[right]
        }
        innerArr[left] = midVal
        run(start, left -1);
        run(left+1, end);
    };
    run();
    return innerArr;
}