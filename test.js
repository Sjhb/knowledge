function twoSum(nums, target) {
    if (!nums || !target) return null
    let i = 0, j = 0
    while (i < nums.length) {
        let remainNum = target - nums[i]
        let remainIndex = nums.indexOf(remainNum, i + 1)
        if (remainIndex > -1) {
            j = remainIndex
            break
        }
        i++
    }
    return j > 0 ? [i, j] : null
}
console.log(twoSum([2, 22, 66, 7, 11, 15], 9))
function quickSort(arr){
    let sort =  (array) => {
      if (!array || array.length < 2) return array
      const baseVal = array[0]
      let leftArr = [], rightArr = [], i = 1
      while(i < array.length) {
        const tempVal = array[i]
        if (baseVal > tempVal) {
          leftArr.push(tempVal)
        } else {
          rightArr.push(tempVal)
        }
        i++
      }
      return [...sort(leftArr), baseVal, ...sort(rightArr)]
    }
    return sort(arr)
  }
  console.log(quickSort([11,22,3,3,3,311,45,98,7,4,2]))