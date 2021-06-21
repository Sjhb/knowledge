/**
 * @param {string} s
 * @return {number}
 */
 var myAtoi = function(s) {
  let index = 0;
  let isCheckingEmpty = true, checkedPositiveNum = false;
  let isNegative = false;
  let resNum = 0;
  while (s.length > index) {
      let char = s[index];
      if (isCheckingEmpty) {
          if (char === '') {
              index ++;
          } else {
              isCheckingEmpty = false;
          }
      } else if (!checkedPositiveNum){
          checkedPositiveNum = true;
          if (char !== '-' && char !== '+') {
              continue;
          }
          if (char === '-') {
              isNegative = true;
          }
          index++;
      } else {
          if (/[0-9]/.test(char)) {
              resNum = resNum*10 + Number(char);
              index++;
              if (!isNegative && resNum > (Math.pow(2, 31) - 1)) {
                  return Math.pow(2, 31) - 1;
              } else if (isNegative && resNum > Math.pow(2, 31)) {
                  return 0 - Math.pow(2, 31) - 1;
              }
          } else {
              break;
          }
      }
  }
  return isNegative ? 0 - resNum : resNum;
};
myAtoi('    -42')