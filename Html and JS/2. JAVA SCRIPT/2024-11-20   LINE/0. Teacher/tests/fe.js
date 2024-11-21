import axios from 'axios'
import * as cheerio from 'cheerio';

(async () => {
  try {
    const { data } = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    // console.log($('#fe .card-title').text())
    const courses = []
    $('#fe .card').each(function () {
      courses.push(new URL($(this).find('img').attr('src'), 'https://wdaweb.github.io').href)
    })
    console.log(courses)
  } catch (error) {
    console.error(error)
  }
})()
