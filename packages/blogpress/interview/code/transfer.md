---
isTimeLine: true
title: 任意进制转换
date: 2020-05-03
tags:
 - 面试
 - 手撕代码
categories:
 - 面试
---
# 任意进制转换
```js
/**
 * 其他进制转10进制
 * @param {number} num
 * @param {number} n
 */
function otherToTen(num, n) {
  let sum = 0
  const a = 'a'.charCodeAt()
  const zero = '0'.charCodeAt()
  for (let i = num.length - 1; i >= 0; i--) {
    const char = num.slice(i, i + 1)
    const az = /[a-z]/
    let t = 0
    if (az.test(char)) {
      t = char.charCodeAt() - a + 10
    }
    else {
      t = char.charCodeAt() - zero
    }
    if (t >= n) {
      throw new Error('error num')
    }
    sum += ~~(t * n ** (num.length - 1 - i))
  }
  return sum
}
/**
 * 十进制转其它进制
 * @param {number} num
 * @param {number} n
 */
function tenToOther(num, n) {
  const zero = '0'.charCodeAt()
  const a = 'a'.charCodeAt()
  let res = ''
  while (num) {
    let t = num % n
    if (t >= 0 && t < 10) {
      res = String.fromCharCode(t + zero) + res
    }
    else {
      t -= 10
      res = String.fromCharCode(t + a) + res
    }
    num /= n
    num = ~~num
  }
  return res
}

console.log(otherToTen('1001011', 2)) // 75
console.log(tenToOther('9999', 16)) // 270f
```
