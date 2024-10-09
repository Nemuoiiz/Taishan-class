/**
 * 早安
 */
const GoodMorning = () => { }
GoodMorning()

/**
 * 早安
 * @param time 時間
 * @param item 物品
 * 沒有 return 的 funtion 會是 void
 */
const GoodMorning2 = (time, item) => { }

/**
 * 早安
 * @param time {string} 時間
 * @param item {string} 物品
 * 用 {} 去定義資料型態
 */
const GoodMorning3 = (time, item) => { }

/**
 * 早安
 * @param [time=早上] {string} 時間
 * @param [item=冰淇淋] {string} 物品
 * 用 [] 加上預設值
 */
const GoodMorning4 = (time = '早上', item = '冰淇淋') => { }

/**
 * 早安
 * @param [time=早上] {string} 時間
 * @param [item=冰淇淋] {string} 物品
 * @returns {string} 組合完的訊息
 */
const GoodMorning5 = (time = '早上', item = '冰淇淋') => { }

