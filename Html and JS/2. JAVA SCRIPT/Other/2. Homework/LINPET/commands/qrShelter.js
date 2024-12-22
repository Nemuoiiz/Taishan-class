export default async event => {
  event.reply({
    type: 'text',
    text: '請選擇您想查詢的新北市公立動物之家：',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: '板橋區公立動物之家',
            text: '板橋區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '新店區公立動物之家',
            text: '新店區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '中和區公立動物之家',
            text: '中和區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '淡水區公立動物之家',
            text: '淡水區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '瑞芳區公立動物之家',
            text: '瑞芳區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '五股區公立動物之家',
            text: '五股區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '八里區公立動物之家',
            text: '八里區公立動物之家'
          }
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '三芝區公立動物之家',
            text: '三芝區公立動物之家'
          }
        }
      ]
    }
  })
}
