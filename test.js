function quickSort (arr,start, end) {
    let left = start || 0;
    let right = end || arr.length - 1;
    if (end - start < 2) {
        return;
    }
    let midVal = arr[left];
    while (left < right) {
        console.log(left, right,arr)
        while (midVal <= arr[right] && left < right) {
            right--;
        }
        if (left === right) break;
        arr[left] = arr[right];
        arr[right] = midVal;
        while (midVal >= arr[left] && left < right) {
            left++;
        }
        if (left === right) break;
        arr[right] = arr[left];
        arr[left] = midVal;
    }
    quickSort(arr, start || 0, left);
    quickSort(arr, left + 1, end || arr.length - 1);
}
let arr = [5, 9, 1, 9, 5, 3, 7, 6, 1] 
quickSort(arr);
console.log(arr)