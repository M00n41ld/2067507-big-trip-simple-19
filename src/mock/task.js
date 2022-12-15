import { getRandomPositiveInteger } from '../utils';
import { getRandomArrayElement } from '../utils';


// const data = [{
//   destination: {
//     'id': 1,
//     'description': 'Chamonix, is a beautiful city, a true pearl, with crowded streets.',
//     'name': 'Chamonix',
//     'pictures': [
//       {
//         'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
//         'description': 'Chamonix parliament building'
//       }
//     ]
//   },
//   offer: [
//     {
//       'id': 1,
//       'title': 'Buy an entire room',
//       'price': 120
//     },
//     {
//       'id': 2,
//       'title': 'Get breakfast',
//       'price': 10
//     },
//     {
//       'id': 3,
//       'title': 'Go to spa',
//       'price': 10
//     },
//   ],
//   offersByType: {
//     'type': 'bus',
//     'offers': 'offer'
//   },
//   offersType: 'bus',
//   point: {
//     'basePrice': 1100,
//     'dateFrom': '2019-07-10T20:55:56.845Z',
//     'dateTo': '2019-07-11T11:20:13.375Z',
//     'destination': 'Chamonix',
//     'id': '0',
//     'offers': 'offers',
//     'type': 'bus'
//   },
//   pointType: 'bus',
//   localPoint: {
//     'basePrice': 222,
//     'dateFrom': '2019-07-10T23:55:56.845Z',
//     'dateTo': '2019-07-11T11:22:13.375Z',
//     'destination': 'Chamonix',
//     'offers': 'offers',
//     'type': 'bus'
//   },
//   authorizationError:
//   {
//     'error': 401,
//     'message': 'Header Authorization is not correct'
//   },
//   notFoundError:
//   {
//     'error': 404,
//     'message': 'Not found'
//   }
// },

// {
//   destination: {
//     'id': 2,
//     'description': 'Amsterdam, is a city with crowded streets.',
//     'name': 'Amsterdam',
//     'pictures': [
//       {
//         'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
//         'description': 'Amsterdam parliament building'
//       }
//     ]
//   },
//   offer: [
//     {
//       'id': 1,
//       'title': 'Buy an entire room',
//       'price': 120
//     },
//     {
//       'id': 2,
//       'title': 'Get breakfast',
//       'price': 10
//     },
//     {
//       'id': 3,
//       'title': 'Go to spa',
//       'price': 10
//     },
//   ],
//   offersByType: {
//     'type': 'flight',
//     'offers': 'offer'
//   },
//   offersType:
//     'flight',
//   point: {
//     'basePrice': 4310,
//     'dateFrom': '2019-07-10T22:55:56.845Z',
//     'dateTo': '2019-07-11T11:22:13.375Z',
//     'destination': 'Amsterdam',
//     'id': '0',
//     'offers': 'offers',
//     'type':  'flight'
//   },
//   pointType: 'flight',
//   localPoint: {
//     'basePrice': 252,
//     'dateFrom': '2019-06-10T22:55:56.845Z',
//     'dateTo': '2019-06-11T11:22:13.375Z',
//     'destination': 'Amsterdam',
//     'offers': 'offers',
//     'type': 'flight'
//   },
//   authorizationError:
//     {
//       'error': 401,
//       'message': 'Header Authorization is not correct'
//     },
//   notFoundError:
//     {
//       'error': 404,
//       'message': 'Not found'
//     }
// },

// {
//   destination: {
//     'id': 3,
//     'description': 'New-York, is a beautiful city, a true asian pearl, with crowded streets.',
//     'name': 'New-York',
//     'pictures': [
//       {
//         'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
//         'description': 'New-York parliament building'
//       }
//     ]
//   },
//   offer: [
//     {
//       'id': 1,
//       'title': 'Buy an entire room',
//       'price': 120
//     },
//     {
//       'id': 2,
//       'title': 'Get breakfast',
//       'price': 10
//     },
//     {
//       'id': 3,
//       'title': 'Go to spa',
//       'price': 10
//     },
//   ],
//   offersByType: {
//     'type': 'plane',
//     'offers': 'offer'
//   },
//   offersType: 'plane',
//   point: {
//     'basePrice': 190,
//     'dateFrom': '2017-07-10T22:55:56.845Z',
//     'dateTo': '2018-07-11T11:22:13.375Z',
//     'destination': 'New-York',
//     'id': '0',
//     'offers': 'flight',
//     'type': 'bus'
//   },
//   pointType: 'flight',
//   localPoint: {
//     'basePrice': 452,
//     'dateFrom': '2020-08-10T22:55:56.845Z',
//     'dateTo': '2020-09-11T11:22:13.375Z',
//     'destination': 'New-York',
//     'offers': 'offers',
//     'type': 'flight'
//   },
//   authorizationError:
//     {
//       'error': 401,
//       'message': 'Header Authorization is not correct'
//     },
//   notFoundError:
//     {
//       'error': 404,
//       'message': 'Not found'
//     }
// }];

const newData = [
  {
    'basePrice': 190,
    'dateFrom': '2017-07-10T22:55:56.845Z',
    'dateTo': '2018-07-11T11:22:13.375Z',
    'destination': 'New-Deli',
    'id': '1',
    'offers': 'taxi',
    'type': 'taxi'
  },
  {
    'basePrice': 490,
    'dateFrom': '2017-07-10T22:55:56.845Z',
    'dateTo': '2018-07-11T11:22:13.375Z',
    'destination': 'Bangkok',
    'id': '2',
    'offers': 'bus',
    'type': 'bus'
  },
  {
    'basePrice': 1000,
    'dateFrom': '2017-07-10T22:55:56.845Z',
    'dateTo': '2018-07-11T11:22:13.375Z',
    'destination': 'Tbilisi',
    'id': '3',
    'offers': 'train',
    'type': 'train'
  },
  {
    'basePrice': 1540,
    'dateFrom': '2017-07-10T22:55:56.845Z',
    'dateTo': '2018-07-11T11:22:13.375Z',
    'destination': 'Moscow',
    'id': '4',
    'offers': 'ship',
    'type': 'ship'
  },
  {
    'basePrice': 180,
    'dateFrom': '2017-07-12T14:43:56.845Z',
    'dateTo': '2018-07-11T19:25:13.375Z',
    'destination': 'New-York',
    'id': '5',
    'offers': 'drive',
    'type': 'drive'
  },
  {
    'basePrice': 190,
    'dateFrom': '2017-07-09T20:55:56.845Z',
    'dateTo': '2018-07-11T08:55:13.375Z',
    'destination': 'New-York',
    'id': '6',
    'offers': 'flight',
    'type': 'flight'
  },
  {
    'basePrice': 9990,
    'dateFrom': '2016-07-10T22:55:56.845Z',
    'dateTo': '2016-07-11T09:12:34.375Z',
    'destination': 'Amsterdam',
    'id': '7',
    'offers': 'fcheck-in',
    'type': 'check-in'
  },
  {
    'basePrice': 1430,
    'dateFrom': '2017-06-09T12:30:56.845Z',
    'dateTo': '2018-07-11T10:21:13.375Z',
    'destination': 'Paris',
    'id': '8',
    'offers': 'sightseeing',
    'type': 'sightseeing'
  },
  {
    'basePrice': 7550,
    'dateFrom': '2017-07-10T22:55:56.845Z',
    'dateTo': '2018-07-13T11:23:15.375Z',
    'destination': 'Mew-Mexico',
    'id': '9',
    'offers': 'restaurant',
    'type': 'restaurant'
  },
];

const destinationsList = [
  {
    'id': '1',
    'description': 'Amsterdam is the capital and most populous city of the Netherlands, with The Hague being the seat of government.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Amsterdam parliament building'
      }
    ]
  },
  {
    'id': '2',
    'description': 'New York, often called New York City or NYC, is the most populous city in the United States.',
    'name': 'New-York',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'New-York parliament building'
      }
    ]
  },
  {
    'id': '3',
    'description': 'Paris is the capital and most populous city of France, with an estimated population of 2,165,423 residents in 2019 in an area of more than 105 km².',
    'name': 'Paris',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Paris parliament building'
      }
    ]
  },
  {
    'id': '4',
    'description': 'Bangkok, officially known in Thai as Krung Thep Maha Nakhon and colloquially as Krung Thep, is the capital and most populous city of Thailand.',
    'name': 'Bangkok',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Bangkok parliament building'
      }
    ]
  },
  {
    'id': '5',
    'description': 'Bangkok, officially known in Thai as Krung Thep Maha Nakhon and colloquially as Krung Thep, is the capital and most populous city of Thailand.',
    'name': 'Bangkok',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Bangkok parliament building'
      }
    ]
  },
  {
    'id': '6',
    'description': 'Bangkok, officially known in Thai as Krung Thep Maha Nakhon and colloquially as Krung Thep, is the capital and most populous city of Thailand.',
    'name': 'Bangkok',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Bangkok parliament building'
      }
    ]
  },
  {
    'id': '7',
    'description': 'Bangkok, officially known in Thai as Krung Thep Maha Nakhon and colloquially as Krung Thep, is the capital and most populous city of Thailand.',
    'name': 'Bangkok',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Bangkok parliament building'
      }
    ]
  },
  {
    'id': '8',
    'description': 'Bangkok, officially known in Thai as Krung Thep Maha Nakhon and colloquially as Krung Thep, is the capital and most populous city of Thailand.',
    'name': 'Bangkok',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Bangkok parliament building'
      }
    ]
  },
  {
    'id': '9',
    'description': 'Bangkok, officially known in Thai as Krung Thep Maha Nakhon and colloquially as Krung Thep, is the capital and most populous city of Thailand.',
    'name': 'Bangkok',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,100)}`,
        'description': 'Bangkok parliament building'
      }
    ]
  }
];

const offersByType = [
  {
    'type': 'taxi',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire taxi',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast to taxi',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa in taxi',
      'price': 430
    }]
  },
  {
    'type': 'bus',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire bus',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast in the bus',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa in bus',
      'price': 430
    }]
  },
  {
    'type': 'train',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire train',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast to train',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to toilet in train',
      'price': 430
    }]
  },
  {
    'type': 'ship',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire ship',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast to ship',
      'price': 105
    },
    {
      'id': 3,
      'title': 'Go swimming in the sea',
      'price': 430
    }]
  },
  {
    'type': 'drive',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire car',
      'price': 1420
    },
    {
      'id': 2,
      'title': 'Go camping in the car',
      'price': 106
    },
    {
      'id': 3,
      'title': 'Go to spa in taxi',
      'price': 430
    }]
  },
  {
    'type': 'flight',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire plane',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast in the sky',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa in the sky',
      'price': 430
    }]
  },
  {
    'type': 'check-in',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire hotel',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast to a room',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa in hotel',
      'price': 430
    }]
  },
  {
    'type': 'sightseeing',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire mountain',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Get breakfast to an Everest',
      'price': 10
    },
    {
      'id': 3,
      'title': 'Go to spa in hot springs',
      'price': 430
    },
    {
      'id': 4,
      'title': 'Go nowhere',
      'price': 43054
    }]
  },
  {
    'type': 'restaurant',
    'offers': [{
      'id': 1,
      'title': 'Buy an entire restaurant',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Eat crabs',
      'price': 10
    }]
  }
];


function makeNewTrip (point, info) {
  const resultArray = point.map((x) => x);
// console.log(resultArray)
  for (let i = 0; i < point.length; i++) {
    for (let j = 0; j < info.length; j++) {
      if(info[j].id === newData[i].id) {
        resultArray[i].destination = info[j];
      }
    }
  }
  return resultArray;
}
// console.log(makeNewTrip(newData, destinationsList))


function getRandomTrip() {
  return getRandomArrayElement(makeNewTrip(newData, destinationsList));
}

export {getRandomTrip, offersByType};
