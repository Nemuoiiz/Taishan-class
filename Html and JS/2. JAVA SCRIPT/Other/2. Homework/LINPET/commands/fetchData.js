import axios from 'axios'

export default async function fetchData (animalType, shelterIds) {
  try {
    const response = await axios.get('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
    const allData = response.data
    // 過濾條件：動物種類 & 收容所
    return allData
      .filter(
        (item) =>
          item.animal_kind === animalType && shelterIds.includes(item.animal_shelter_pkid.toString())
      )
      .slice(0, 10) // 只取前五筆資料
  } catch (error) {
    console.error('API 錯誤：', error)
    return []
  }
}
