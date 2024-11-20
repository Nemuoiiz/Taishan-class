import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../templates/fe.js'
import fs from 'node:fs'

export default async (event) => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    // console.log($('#fe .card-title').text())
    const courses = []
    $('#fe .card').each(function () {
      const t = template()
      const url = new URL($(this).find('img').attr('src'), 'https://wdaweb.github.io').href
      const name = $(this).find('.card-title').text().trim()

      t.body.contents[0].url = url
      t.body.contents[2].contents[0].contents[0].contents[0].text = name

      courses.push(t)
    })

    const result = await event.reply({
      type: 'flex',
      altText: '課程查詢結果',
      contents: {
        type: 'carousel',
        contents: courses
      }
    })
    console.log(result)

    if (process.env.DEBUG === 'true' && result.message) {
      // 第一個參數，它將完整序列化 courses，保留所有屬性。
      // 第二個參數，null 表示不使用任何屬性過濾或轉換。
      // 第三個參數 2 表示每層縮排 2 個空格，使輸出的 JSON 格式更易讀。
      fs.writeFileSync('./dump/fe.json', JSON.stringify(courses, null, 2))
    }
  } catch (error) {
    console.log('error')
    console.error(error)
  }
}
