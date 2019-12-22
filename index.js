function quickSort (arr) {
    let newArr = arr.slice();
    function sort (left1, right1) {
        if (left1 === right1 || left1 > right1) return
        let left = left1 || 0, right = right1 || arr.length - 1,tempValue = newArr[left];
        while(left < right) {
            while (right > left && newArr[right] > tempValue) {
                right--;
            }
            let temp = newArr[left]
            newArr[left] = newArr[right]
            newArr[right] = temp
            while (right > left && newArr[left] <= tempValue) {
                left++;
            }
            let temp1 = newArr[left]
            newArr[left] = newArr[right]
            newArr[right] = temp1
            
        }
        console.log(newArr)
        sort(left1, left - 1)
        sort(right + 1, right1)    
    }
    sort(0, arr.length - 1)
    return newArr;
}
console.log(quickSort([1,3,2,8,2,9,10,7,78,22,12,2,3,4,5,6,4]));