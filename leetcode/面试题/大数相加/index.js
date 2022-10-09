let a = "9007199254740991";
let b = "1234567899999999999";
function addTwoBigNumber(str1, str2) {
    /* 相加的结果 */
    let sum = '';
    /* 相加的数的临时变量 */
    let temp = 0;
    //进位
    let bit = 0;
    //取出最长长度
    let maxLen = Math.max(str1.length, str2.length);
    //不够长的话在前面补零
    str1 = str1.padStart(maxLen, '0');
    str2 = str2.padStart(maxLen, '0');
    for (let index = maxLen - 1; index >= 0; index--) {
        temp = parseInt(str1[index]) + parseInt(str2[index]) + bit;
        bit = Math.floor(temp / 10);
        sum = temp % 10 + sum
    }
    /* 如果最后还有进位  1 的话 */
    if (bit == 1) {
        sum = '1' + sum;
    }
    return sum;
}
console.log(addTwoBigNumber(a, b));