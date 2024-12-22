export default async event => {
  event.reply({
    type: 'text',
    text: '你要查詢哪個縣市的收容所',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            text: '2:taipei',
            label: '臺北市'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            text: '3:NewTaipei',
            label: '新北市'
          }
        }
      ]
    }
  })
}
