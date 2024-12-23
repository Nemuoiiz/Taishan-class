export default function replyCard (animal) {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: animal.album_file || 'https://via.placeholder.com/300x200.png?text=No+Image',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: {
        type: 'uri',
        uri: 'https://line.me/'
      }
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: animal.animal_subid, weight: 'bold', size: 'xl' },
        {
          type: 'box',
          layout: 'vertical',
          margin: 'lg',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                { type: 'text', text: '動物性別', color: '#aaaaaa', size: 'sm', flex: 2 },
                { type: 'text', text: animal.animal_sex, wrap: true, color: '#666666', size: 'sm', flex: 4 }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                { type: 'text', text: '公告收容所', color: '#aaaaaa', size: 'sm', flex: 2 },
                { type: 'text', text: animal.shelter_name, wrap: true, color: '#666666', size: 'sm', flex: 4 }
              ]
            },
            {
              type: 'box',
              layout: 'baseline',
              spacing: 'sm',
              contents: [
                { type: 'text', text: '收容所電話', color: '#aaaaaa', size: 'sm', flex: 2 },
                { type: 'text', text: animal.shelter_tel, wrap: true, color: '#666666', size: 'sm', flex: 4 }
              ]
            }
          ]
        }
      ]
    }
  }
}
