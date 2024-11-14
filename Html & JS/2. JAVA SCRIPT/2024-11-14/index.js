// 🔻引用 a.js 的 export default
// 🔷 import 變數 form 來源
// from 'a.js'   --> 引用 a.js 套件
// from './a.js' --> 引用 a.js 檔案

import a from './a.js'

// 🔻 一次引用所有的 export，並取名為 b
import * as b from './b.js'

// 🔻 只引用指定的變數
// 可以用 as 重新命名
import { b1, b2, b3, b4 as bb4 } from './b.js'

// 🔻 同時引用預設和具名的方式
// import c, {c1,c2,c3} from './c.js'
// import c, * as cc  from './c.js'



// 1️⃣ a.js-----------------------------------

// 測試能不能使用 a.js 的變數和 function
a.log()
console.log('index - a.a1: ' + a.a1)
console.log('index - a.add: ' + a.add())

// 測試修改 a.js 變數
// pass by value     ⚠️ 簡單改值的話是改自己的這份
// pass by reference ⚠️ 陣列物件則會改動到原本檔案的資料
a.a1 = 100
a.a2 = 100
a.a3 = 100
a.a4.push(300)
// a.js a1: 1
// a.js a2: 2
// a.js a3: 3
// a.js a4: 100,200,300 => 被改動
console.log('index - a.a1 ' + a.a1)
console.log('index - a.a2 ' + a.a2)
console.log('index - a.a3 ' + a.a3)
console.log('index - a.a4 ' + a.a4)
a.log()

a.test(500)

console.log('index - a.a3 ' + a.a3)
a.log()



// 2️⃣ b.js-------------------------

console.log('index - b.b3 ' + b.b3)
// 具名引用的值無法修法，不管來源是 const 還是 let 都無法
// 例如以下：
// b.b1 = 5
// b.b3 = 100
// b3 = 100
b.test(100)
console.log('index - b.b3 ' + b.b3)
b.b4.push(300)
bb4.push(400)
console.log('index - b.b4 ' + b.b4)
console.log('index - bb4 ' + bb4)
b.log()

