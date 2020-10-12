export const raw = {
  tags: [
    {
      id: 1,
      tag: 'Daf Yomi',
      type: 1
    },
    {
      id: 2,
      tag: 'Berachos',
      type: 2
    },
    {
      id: 3,
      tag: 'with Rashi',
      type: 3
    },
    {
      id: 4,
      tag: 'without Rashi',
      type: 3
    },
    {
      id: 5,
      tag: 'Shabbos',
      type: 2
    },
    {
      id: 6,
      tag: 'Eruvin',
      type: 2
    }
  ],
  shiurim: [
    {
      id: 1,
      title: 'Daf 2',
      tags: [ 1, 2, 3 ],
      date: '2020-01-05T06:00:00',
      duration: '50:08',
      previousId: null,
      nextId: 3,
      authorId: 1
    },
    {
      id: 2,
      title: 'Daf 2',
      tags: [ 1, 2, 4 ],
      date: '2020-01-05T22:00:00',
      duration: '26:04',
      previousId: null,
      nextId: 4,
      authorId: 1
    },
    {
      id: 3,
      title: 'Daf 3',
      tags: [ 1, 2, 3 ],
      date: '2020-01-06T06:00:00',
      duration: '43:20',
      previousId: 1,
      nextId: 5,
      authorId: 1
    },
    {
      id: 4,
      title: 'Daf 3',
      tags: [ 1, 2, 4 ],
      date: '2020-01-06T22:00:00',
      duration: '28:15',
      previousId: 2,
      nextId: 6,
      authorId: 1
    },
    {
      id: 5,
      title: 'Daf 4',
      tags: [ 1, 2, 3 ],
      date: '2020-01-07T06:00:00',
      duration: '44:33',
      previousId: 3,
      nextId: 7,
      authorId: 1
    },
    {
      id: 6,
      title: 'Daf 4',
      tags: [ 1, 2, 4 ],
      date: '2020-01-07T22:00:00',
      duration: '27:54',
      previousId: 4,
      nextId: 8,
      authorId: 1
    },
    {
      id: 7,
      title: 'Daf 5',
      tags: [ 1, 2, 3 ],
      date: '2020-01-08T06:00:00',
      duration: '47:06',
      previousId: 5,
      nextId: 9,
      authorId: 1
    },
    {
      id: 8,
      title: 'Daf 5',
      tags: [ 1, 2, 4 ],
      date: '2020-01-08T22:00:00',
      duration: '27:55',
      previousId: 6,
      nextId: 10,
      authorId: 1
    },
    {
      id: 9,
      title: 'Daf 6',
      tags: [ 1, 2, 3 ],
      date: '2020-01-09T06:00:00',
      duration: '45:01',
      previousId: 7,
      nextId: 11,
      authorId: 1
    },
    {
      id: 10,
      title: 'Daf 6',
      tags: [ 1, 2, 4 ],
      date: '2020-01-09T22:00:00',
      duration: '27:19',
      previousId: 8,
      nextId: 11,
      authorId: 1
    },
    {
      id: 11,
      title: 'Daf 7',
      tags: [ 1, 2, 3 ],
      date: '2020-01-10T06:00:00',
      duration: '47:02',
      previousId: 9,
      nextId: 12,
      authorId: 1
    },
    {
      id: 12,
      title: 'Daf 8',
      tags: [ 1, 2, 3 ],
      date: '2020-01-11T06:00:00',
      duration: '36:52',
      previousId: 11,
      nextId: 13,
      authorId: 1
    },
    {
      id: 13,
      title: 'Daf 9',
      tags: [ 1, 2, 3 ],
      date: '2020-01-12T06:00:00',
      duration: '37:26',
      previousId: 12,
      nextId: 15,
      authorId: 1
    },
    {
      id: 14,
      title: 'Daf 9',
      tags: [ 1, 2, 4 ],
      date: '2020-01-12T22:00:00',
      duration: '25:29',
      previousId: 12,
      nextId: 16,
      authorId: 1
    },
    {
      id: 15,
      title: 'Daf 10',
      tags: [ 1, 2, 3 ],
      date: '2020-01-13T06:00:00',
      duration: '47:39',
      previousId: 13,
      nextId: 17,
      authorId: 1
    },
    {
      id: 16,
      title: 'Daf 10',
      tags: [ 1, 2, 4 ],
      date: '2020-01-13T22:00:00',
      duration: '32:05',
      previousId: 14,
      nextId: 18,
      authorId: 1
    },
    {
      id: 17,
      title: 'Daf 11',
      tags: [ 1, 2, 3 ],
      date: '2020-01-14T06:00:00',
      duration: '51:50',
      previousId: 15,
      nextId: 19,
      authorId: 1
    },
    {
      id: 18,
      title: 'Daf 11',
      tags: [ 1, 2, 4 ],
      date: '2020-01-14T22:00:00',
      duration: '30:52',
      previousId: 16,
      nextId: 20,
      authorId: 1
    },
    {
      id: 19,
      title: 'Daf 12',
      tags: [ 1, 2, 3 ],
      date: '2020-01-15T06:00:00',
      duration: '49:15',
      previousId: 17,
      nextId: 21,
      authorId: 1
    },
    {
      id: 20,
      title: 'Daf 12',
      tags: [ 1, 2, 4 ],
      date: '2020-01-15T22:00:00',
      duration: '29:29',
      previousId: 18,
      nextId: 22,
      authorId: 1
    },
    {
      id: 21,
      title: 'Daf 13',
      tags: [ 1, 2, 3 ],
      date: '2020-01-16T06:00:00',
      duration: '45:39',
      previousId: 19,
      nextId: 23,
      authorId: 1
    },
    {
      id: 22,
      title: 'Daf 13',
      tags: [ 1, 2, 4 ],
      date: '2020-01-16T22:00:00',
      duration: '24:44',
      previousId: 20,
      nextId: 24,
      authorId: 1
    },
    {
      id: 23,
      title: 'Daf 14',
      tags: [ 1, 2, 3 ],
      date: '2020-01-17T06:00:00',
      duration: '43:04',
      previousId: 21,
      nextId: 24,
      authorId: 1
    },
    {
      id: 24,
      title: 'Daf 15',
      tags: [ 1, 2, 3 ],
      date: '2020-01-18T06:00:00',
      duration: '42:34',
      previousId: 23,
      nextId: 25,
      authorId: 1
    },
    {
      id: 25,
      title: 'Daf 16',
      tags: [ 1, 2, 3 ],
      date: '2020-01-19T06:00:00',
      duration: '47:40',
      previousId: 24,
      nextId: 27,
      authorId: 1
    },
    {
      id: 26,
      title: 'Daf 16',
      tags: [ 1, 2, 4 ],
      date: '2020-01-19T22:00:00',
      duration: '29:54',
      previousId: 24,
      nextId: 28,
      authorId: 1
    },
    {
      id: 27,
      title: 'Daf 17',
      tags: [ 1, 2, 3 ],
      date: '2020-01-20T06:00:00',
      duration: '50:20',
      previousId: 25,
      nextId: 29,
      authorId: 1
    },
    {
      id: 28,
      title: 'Daf 17',
      tags: [ 1, 2, 4 ],
      date: '2020-01-20T22:00:00',
      duration: '31:18',
      previousId: 26,
      nextId: 30,
      authorId: 1
    },
    {
      id: 29,
      title: 'Daf 18',
      tags: [ 1, 2, 3 ],
      date: '2020-01-21T06:00:00',
      duration: '49:07',
      previousId: 27,
      nextId: 31,
      authorId: 1
    },
    {
      id: 30,
      title: 'Daf 18',
      tags: [ 1, 2, 4 ],
      date: '2020-01-21T22:00:00',
      duration: '31:14',
      previousId: 28,
      nextId: 32,
      authorId: 1
    },
    {
      id: 31,
      title: 'Daf 19',
      tags: [ 1, 2, 3 ],
      date: '2020-01-22T06:00:00',
      duration: '54:28',
      previousId: 29,
      nextId: 33,
      authorId: 1
    },
    {
      id: 32,
      title: 'Daf 19',
      tags: [ 1, 2, 4 ],
      date: '2020-01-22T22:00:00',
      duration: '28:21',
      previousId: 30,
      nextId: 34,
      authorId: 1
    },
    {
      id: 33,
      title: 'Daf 20',
      tags: [ 1, 2, 3 ],
      date: '2020-01-23T06:00:00',
      duration: '47:47',
      previousId: 31,
      nextId: 35,
      authorId: 1
    },
    {
      id: 34,
      title: 'Daf 20',
      tags: [ 1, 2, 4 ],
      date: '2020-01-23T22:00:00',
      duration: '25:21',
      previousId: 32,
      nextId: 36,
      authorId: 1
    },
    {
      id: 35,
      title: 'Daf 21',
      tags: [ 1, 2, 3 ],
      date: '2020-01-24T06:00:00',
      duration: '52:37',
      previousId: 34,
      nextId: 36,
      authorId: 1
    },
    {
      id: 36,
      title: 'Daf 22',
      tags: [ 1, 2, 3 ],
      date: '2020-01-25T06:00:00',
      duration: '48:07',
      previousId: 35,
      nextId: 37,
      authorId: 1
    },
    {
      id: 37,
      title: 'Daf 23',
      tags: [ 1, 2, 3 ],
      date: '2020-01-26T06:00:00',
      duration: '51:12',
      previousId: 36,
      nextId: 39,
      authorId: 1
    },
    {
      id: 38,
      title: 'Daf 23',
      tags: [ 1, 2, 4 ],
      date: '2020-01-26T22:00:00',
      duration: '30:15',
      previousId: 36,
      nextId: 40,
      authorId: 1
    },
    {
      id: 39,
      title: 'Daf 24',
      tags: [ 1, 2, 3 ],
      date: '2020-01-27T06:00:00',
      duration: '47:25',
      previousId: 37,
      nextId: 41,
      authorId: 1
    },
    {
      id: 40,
      title: 'Daf 24',
      tags: [ 1, 2, 4 ],
      date: '2020-01-27T22:00:00',
      duration: '26:08',
      previousId: 38,
      nextId: 42,
      authorId: 1
    },
    {
      id: 41,
      title: 'Daf 25',
      tags: [ 1, 2, 3 ],
      date: '2020-01-28T06:00:00',
      duration: '52:32',
      previousId: 39,
      nextId: 43,
      authorId: 1
    },
    {
      id: 42,
      title: 'Daf 25',
      tags: [ 1, 2, 4 ],
      date: '2020-01-28T22:00:00',
      duration: '34:10',
      previousId: 40,
      nextId: 44,
      authorId: 1
    },
    {
      id: 43,
      title: 'Daf 26',
      tags: [ 1, 2, 3 ],
      date: '2020-01-29T06:00:00',
      duration: '46:48',
      previousId: 41,
      nextId: 45,
      authorId: 1
    },
    {
      id: 44,
      title: 'Daf 26',
      tags: [ 1, 2, 4 ],
      date: '2020-01-29T22:00:00',
      duration: '23:48',
      previousId: 42,
      nextId: 46,
      authorId: 1
    },
    {
      id: 45,
      title: 'Daf 27',
      tags: [ 1, 2, 3 ],
      date: '2020-01-30T06:00:00',
      duration: '49:07',
      previousId: 43,
      nextId: 47,
      authorId: 1
    },
    {
      id: 46,
      title: 'Daf 27',
      tags: [ 1, 2, 4 ],
      date: '2020-01-30T22:00:00',
      duration: '21:51',
      previousId: 44,
      nextId: 48,
      authorId: 1
    },
    {
      id: 47,
      title: 'Daf 28',
      tags: [ 1, 2, 3 ],
      date: '2020-01-31T06:00:00',
      duration: '46:34',
      previousId: 46,
      nextId: 48,
      authorId: 1
    },
    {
      id: 48,
      title: 'Daf 29',
      tags: [ 1, 2, 3 ],
      date: '2020-02-01T06:00:00',
      duration: '31:15',
      previousId: 47,
      nextId: 49,
      authorId: 1
    },
    {
      id: 49,
      title: 'Daf 30',
      tags: [ 1, 2, 3 ],
      date: '2020-02-02T06:00:00',
      duration: '41:14',
      previousId: 48,
      nextId: 51,
      authorId: 1
    },
    {
      id: 50,
      title: 'Daf 30',
      tags: [ 1, 2, 4 ],
      date: '2020-02-02T22:00:00',
      duration: '22:42',
      previousId: 48,
      nextId: 52,
      authorId: 1
    },
    {
      id: 51,
      title: 'Daf 31',
      tags: [ 1, 2, 3 ],
      date: '2020-02-03T06:00:00',
      duration: '45:05',
      previousId: 49,
      nextId: 53,
      authorId: 1
    },
    {
      id: 52,
      title: 'Daf 31',
      tags: [ 1, 2, 4 ],
      date: '2020-02-03T22:00:00',
      duration: '28:23',
      previousId: 50,
      nextId: 54,
      authorId: 1
    },
    {
      id: 53,
      title: 'Daf 32',
      tags: [ 1, 2, 3 ],
      date: '2020-02-04T06:00:00',
      duration: '46:03',
      previousId: 51,
      nextId: 55,
      authorId: 1
    },
    {
      id: 54,
      title: 'Daf 32',
      tags: [ 1, 2, 4 ],
      date: '2020-02-04T22:00:00',
      duration: '29:24',
      previousId: 52,
      nextId: 55,
      authorId: 1
    },
    {
      id: 55,
      title: 'Daf 33',
      tags: [ 1, 2, 3 ],
      date: '2020-02-05T06:00:00',
      duration: '46:51',
      previousId: 53,
      nextId: 56,
      authorId: 1
    },
    {
      id: 56,
      title: 'Daf 34',
      tags: [ 1, 2, 3 ],
      date: '2020-02-06T06:00:00',
      duration: '32:07',
      previousId: 55,
      nextId: 57,
      authorId: 1
    },
    {
      id: 57,
      title: 'Daf 35',
      tags: [ 1, 2, 3 ],
      date: '2020-02-07T06:00:00',
      duration: '36:24',
      previousId: 56,
      nextId: 58,
      authorId: 1
    },
    {
      id: 58,
      title: 'Daf 36',
      tags: [ 1, 2, 3 ],
      date: '2020-02-08T06:00:00',
      duration: '55:24',
      previousId: 57,
      nextId: 59,
      authorId: 1
    },
    {
      id: 59,
      title: 'Daf 37',
      tags: [ 1, 2, 3 ],
      date: '2020-02-09T06:00:00',
      duration: '35:56',
      previousId: 58,
      nextId: 60,
      authorId: 1
    },
    {
      id: 60,
      title: 'Daf 38',
      tags: [ 1, 2, 3 ],
      date: '2020-02-10T06:00:00',
      duration: '34:07',
      previousId: 59,
      nextId: 61,
      authorId: 1
    },
    {
      id: 61,
      title: 'Daf 39',
      tags: [ 1, 2, 3 ],
      date: '2020-02-11T06:00:00',
      duration: '43:49',
      previousId: 60,
      nextId: 63,
      authorId: 1
    },
    {
      id: 62,
      title: 'Daf 39',
      tags: [ 1, 2, 4 ],
      date: '2020-02-11T22:00:00',
      duration: '15:59',
      previousId: 60,
      nextId: 64,
      authorId: 1
    },
    {
      id: 63,
      title: 'Daf 40',
      tags: [ 1, 2, 3 ],
      date: '2020-02-12T06:00:00',
      duration: '45:53',
      previousId: 61,
      nextId: 65,
      authorId: 1
    },
    {
      id: 64,
      title: 'Daf 40',
      tags: [ 1, 2, 4 ],
      date: '2020-02-12T22:00:00',
      duration: '25:28',
      previousId: 62,
      nextId: 66,
      authorId: 1
    },
    {
      id: 65,
      title: 'Daf 41',
      tags: [ 1, 2, 3 ],
      date: '2020-02-13T06:00:00',
      duration: '45:48',
      previousId: 63,
      nextId: 67,
      authorId: 1
    },
    {
      id: 66,
      title: 'Daf 41',
      tags: [ 1, 2, 4 ],
      date: '2020-02-13T22:00:00',
      duration: '18:57',
      previousId: 64,
      nextId: 67,
      authorId: 1
    },
    {
      id: 67,
      title: 'Daf 42',
      tags: [ 1, 2, 3 ],
      date: '2020-02-14T06:00:00',
      duration: '42:05',
      previousId: 66,
      nextId: 68,
      authorId: 1
    },
    {
      id: 68,
      title: 'Daf 43',
      tags: [ 1, 2, 3 ],
      date: '2020-02-15T06:00:00',
      duration: '45:25',
      previousId: 67,
      nextId: 69,
      authorId: 1
    },
    {
      id: 69,
      title: 'Daf 44',
      tags: [ 1, 2, 3 ],
      date: '2020-02-16T06:00:00',
      duration: '45:06',
      previousId: 68,
      nextId: 71,
      authorId: 1
    },
    {
      id: 70,
      title: 'Daf 44',
      tags: [ 1, 2, 4 ],
      date: '2020-02-16T22:00:00',
      duration: '23:45',
      previousId: 68,
      nextId: 72,
      authorId: 1
    },
    {
      id: 71,
      title: 'Daf 45',
      tags: [ 1, 2, 3 ],
      date: '2020-02-17T06:00:00',
      duration: '45:11',
      previousId: 69,
      nextId: 73,
      authorId: 1
    },
    {
      id: 72,
      title: 'Daf 45',
      tags: [ 1, 2, 4 ],
      date: '2020-02-17T22:00:00',
      duration: '20:19',
      previousId: 70,
      nextId: 74,
      authorId: 1
    },
    {
      id: 73,
      title: 'Daf 46',
      tags: [ 1, 2, 3 ],
      date: '2020-02-18T06:00:00',
      duration: '40:32',
      previousId: 71,
      nextId: 75,
      authorId: 1
    },
    {
      id: 74,
      title: 'Daf 46',
      tags: [ 1, 2, 4 ],
      date: '2020-02-18T22:00:00',
      duration: '20:42',
      previousId: 72,
      nextId: 76,
      authorId: 1
    },
    {
      id: 75,
      title: 'Daf 47',
      tags: [ 1, 2, 3 ],
      date: '2020-02-19T06:00:00',
      duration: '48:54',
      previousId: 73,
      nextId: 77,
      authorId: 1
    },
    {
      id: 76,
      title: 'Daf 47',
      tags: [ 1, 2, 4 ],
      date: '2020-02-19T22:00:00',
      duration: '26:52',
      previousId: 74,
      nextId: 78,
      authorId: 1
    },
    {
      id: 77,
      title: 'Daf 48',
      tags: [ 1, 2, 3 ],
      date: '2020-02-20T06:00:00',
      duration: '40:09',
      previousId: 75,
      nextId: 79,
      authorId: 1
    },
    {
      id: 78,
      title: 'Daf 48',
      tags: [ 1, 2, 4 ],
      date: '2020-02-20T22:00:00',
      duration: '18:05',
      previousId: 76,
      nextId: 80,
      authorId: 1
    },
    {
      id: 79,
      title: 'Daf 49',
      tags: [ 1, 2, 3 ],
      date: '2020-02-21T06:00:00',
      duration: '42:20',
      previousId: 78,
      nextId: 80,
      authorId: 1
    },
    {
      id: 80,
      title: 'Daf 50',
      tags: [ 1, 2, 3 ],
      date: '2020-02-22T06:00:00',
      duration: '47:50',
      previousId: 79,
      nextId: 81,
      authorId: 1
    },
    {
      id: 81,
      title: 'Daf 51',
      tags: [ 1, 2, 3 ],
      date: '2020-02-23T06:00:00',
      duration: '43:02',
      previousId: 80,
      nextId: 83,
      authorId: 1
    },
    {
      id: 82,
      title: 'Daf 51',
      tags: [ 1, 2, 4 ],
      date: '2020-02-23T22:00:00',
      duration: '20:49',
      previousId: 80,
      nextId: 84,
      authorId: 1
    },
    {
      id: 83,
      title: 'Daf 52',
      tags: [ 1, 2, 3 ],
      date: '2020-02-24T06:00:00',
      duration: '50:43',
      previousId: 81,
      nextId: 85,
      authorId: 1
    },
    {
      id: 84,
      title: 'Daf 52',
      tags: [ 1, 2, 4 ],
      date: '2020-02-24T22:00:00',
      duration: '28:21',
      previousId: 82,
      nextId: 86,
      authorId: 1
    },
    {
      id: 85,
      title: 'Daf 53',
      tags: [ 1, 2, 3 ],
      date: '2020-02-25T06:00:00',
      duration: '49:15',
      previousId: 83,
      nextId: 87,
      authorId: 1
    },
    {
      id: 86,
      title: 'Daf 53',
      tags: [ 1, 2, 4 ],
      date: '2020-02-25T22:00:00',
      duration: '25:42',
      previousId: 84,
      nextId: 87,
      authorId: 1
    },
    {
      id: 87,
      title: 'Daf 54',
      tags: [ 1, 2, 3 ],
      date: '2020-02-26T06:00:00',
      duration: '41:33',
      previousId: 86,
      nextId: 88,
      authorId: 1
    },
    {
      id: 88,
      title: 'Daf 55',
      tags: [ 1, 2, 3 ],
      date: '2020-02-27T06:00:00',
      duration: '41:35',
      previousId: 87,
      nextId: 90,
      authorId: 1
    },
    {
      id: 89,
      title: 'Daf 55',
      tags: [ 1, 2, 4 ],
      date: '2020-02-27T22:00:00',
      duration: '24:49',
      previousId: 87,
      nextId: 91,
      authorId: 1
    },
    {
      id: 90,
      title: 'Daf 56',
      tags: [ 1, 2, 3 ],
      date: '2020-02-28T06:00:00',
      duration: '44:34',
      previousId: 89,
      nextId: 91,
      authorId: 1
    },
    {
      id: 91,
      title: 'Daf 57',
      tags: [ 1, 2, 3 ],
      date: '2020-02-29T06:00:00',
      duration: '40:57',
      previousId: 90,
      nextId: 92,
      authorId: 1
    },
    {
      id: 92,
      title: 'Daf 58',
      tags: [ 1, 2, 3 ],
      date: '2020-03-01T06:00:00',
      duration: '42:32',
      previousId: 91,
      nextId: 94,
      authorId: 1
    },
    {
      id: 93,
      title: 'Daf 58',
      tags: [ 1, 2, 4 ],
      date: '2020-03-01T22:00:00',
      duration: '29:51',
      previousId: 91,
      nextId: 95,
      authorId: 1
    },
    {
      id: 94,
      title: 'Daf 59',
      tags: [ 1, 2, 3 ],
      date: '2020-03-02T06:00:00',
      duration: '43:36',
      previousId: 92,
      nextId: 96,
      authorId: 1
    },
    {
      id: 95,
      title: 'Daf 59',
      tags: [ 1, 2, 4 ],
      date: '2020-03-02T22:00:00',
      duration: '17:59',
      previousId: 93,
      nextId: 97,
      authorId: 1
    },
    {
      id: 96,
      title: 'Daf 60',
      tags: [ 1, 2, 3 ],
      date: '2020-03-03T06:00:00',
      duration: '42:59',
      previousId: 94,
      nextId: 98,
      authorId: 1
    },
    {
      id: 97,
      title: 'Daf 60',
      tags: [ 1, 2, 4 ],
      date: '2020-03-03T22:00:00',
      duration: '25:22',
      previousId: 95,
      nextId: 99,
      authorId: 1
    },
    {
      id: 98,
      title: 'Daf 61',
      tags: [ 1, 2, 3 ],
      date: '2020-03-04T06:00:00',
      duration: '46:53',
      previousId: 96,
      nextId: 100,
      authorId: 1
    },
    {
      id: 99,
      title: 'Daf 61',
      tags: [ 1, 2, 4 ],
      date: '2020-03-04T22:00:00',
      duration: '28:16',
      previousId: 97,
      nextId: 101,
      authorId: 1
    },
    {
      id: 100,
      title: 'Daf 62',
      tags: [ 1, 2, 3 ],
      date: '2020-03-05T06:00:00',
      duration: '46:04',
      previousId: 99,
      nextId: 101,
      authorId: 1
    },
    {
      id: 101,
      title: 'Daf 63',
      tags: [ 1, 2, 3 ],
      date: '2020-03-06T06:00:00',
      duration: '46:34',
      previousId: 100,
      nextId: 102,
      authorId: 1
    },
    {
      id: 102,
      title: 'Daf 64',
      tags: [ 1, 2, 3 ],
      date: '2020-03-07T06:00:00',
      duration: '14:27',
      previousId: 101,
      nextId: 103,
      authorId: 1
    },
    {
      id: 103,
      title: 'Daf 2',
      tags: [ 1, 5, 3 ],
      date: '2020-03-08T06:00:00',
      duration: '41:14',
      previousId: 102,
      nextId: 105,
      authorId: 1
    },
    {
      id: 104,
      title: 'Daf 2',
      tags: [ 1, 5, 4 ],
      date: '2020-03-08T22:00:00',
      duration: '25:06',
      previousId: 102,
      nextId: 106,
      authorId: 1
    },
    {
      id: 105,
      title: 'Daf 3',
      tags: [ 1, 5, 3 ],
      date: '2020-03-09T06:00:00',
      duration: '46:09',
      previousId: 103,
      nextId: 107,
      authorId: 1
    },
    {
      id: 106,
      title: 'Daf 3',
      tags: [ 1, 5, 4 ],
      date: '2020-03-09T22:00:00',
      duration: '22:02',
      previousId: 104,
      nextId: 108,
      authorId: 1
    },
    {
      id: 107,
      title: 'Daf 4',
      tags: [ 1, 5, 3 ],
      date: '2020-03-10T06:00:00',
      duration: '36:16',
      previousId: 106,
      nextId: 108,
      authorId: 1
    },
    {
      id: 108,
      title: 'Daf 5',
      tags: [ 1, 5, 3 ],
      date: '2020-03-11T06:00:00',
      duration: '46:11',
      previousId: 107,
      nextId: 109,
      authorId: 1
    },
    {
      id: 109,
      title: 'Daf 6',
      tags: [ 1, 5, 3 ],
      date: '2020-03-12T06:00:00',
      duration: '48:12',
      previousId: 108,
      nextId: 110,
      authorId: 1
    },
    {
      id: 110,
      title: 'Daf 7',
      tags: [ 1, 5, 3 ],
      date: '2020-03-13T06:00:00',
      duration: '48:16',
      previousId: 109,
      nextId: 111,
      authorId: 1
    },
    {
      id: 111,
      title: 'Daf 8',
      tags: [ 1, 5, 3 ],
      date: '2020-03-14T06:00:00',
      duration: '45:04',
      previousId: 110,
      nextId: 112,
      authorId: 1
    },
    {
      id: 112,
      title: 'Daf 9',
      tags: [ 1, 5, 3 ],
      date: '2020-03-15T06:00:00',
      duration: '36:27',
      previousId: 111,
      nextId: 114,
      authorId: 1
    },
    {
      id: 113,
      title: 'Daf 9',
      tags: [ 1, 5, 4 ],
      date: '2020-03-15T22:00:00',
      duration: '14:04',
      previousId: 111,
      nextId: 115,
      authorId: 1
    },
    {
      id: 114,
      title: 'Daf 10',
      tags: [ 1, 5, 3 ],
      date: '2020-03-16T06:00:00',
      duration: '41:23',
      previousId: 112,
      nextId: 116,
      authorId: 1
    },
    {
      id: 115,
      title: 'Daf 10',
      tags: [ 1, 5, 4 ],
      date: '2020-03-16T22:00:00',
      duration: '17:39',
      previousId: 113,
      nextId: 116,
      authorId: 1
    },
    {
      id: 116,
      title: 'Daf 11',
      tags: [ 1, 5, 3 ],
      date: '2020-03-17T06:00:00',
      duration: '42:47',
      previousId: 114,
      nextId: 117,
      authorId: 1
    },
    {
      id: 117,
      title: 'Daf 12',
      tags: [ 1, 5, 3 ],
      date: '2020-03-18T06:00:00',
      duration: '43:07',
      previousId: 116,
      nextId: 118,
      authorId: 1
    },
    {
      id: 118,
      title: 'Daf 13',
      tags: [ 1, 5, 3 ],
      date: '2020-03-19T06:00:00',
      duration: '48:04',
      previousId: 117,
      nextId: 119,
      authorId: 1
    },
    {
      id: 119,
      title: 'Daf 14',
      tags: [ 1, 5, 3 ],
      date: '2020-03-20T06:00:00',
      duration: '49:02',
      previousId: 118,
      nextId: 120,
      authorId: 1
    },
    {
      id: 120,
      title: 'Daf 15',
      tags: [ 1, 5, 3 ],
      date: '2020-03-21T06:00:00',
      duration: '54:11',
      previousId: 119,
      nextId: 122,
      authorId: 1
    },
    {
      id: 121,
      title: 'Daf 16',
      tags: [ 1, 5, 3 ],
      date: '2020-03-22T06:00:00',
      duration: '44:57',
      previousId: 120,
      nextId: 122,
      authorId: 1
    },
    {
      id: 122,
      title: 'Daf 17',
      tags: [ 1, 5, 3 ],
      date: '2020-03-23T06:00:00',
      duration: '52:14',
      previousId: 121,
      nextId: 123,
      authorId: 1
    },
    {
      id: 123,
      title: 'Daf 18',
      tags: [ 1, 5, 3 ],
      date: '2020-03-24T06:00:00',
      duration: '48:07',
      previousId: 122,
      nextId: 124,
      authorId: 1
    },
    {
      id: 124,
      title: 'Daf 19',
      tags: [ 1, 5, 3 ],
      date: '2020-03-25T00:00:00',
      duration: '41:24',
      previousId: 123,
      nextId: 125,
      authorId: 1
    },
    {
      id: 125,
      title: 'Daf 20',
      tags: [ 1, 5, 3 ],
      date: '2020-03-26T00:00:00',
      duration: '45:22',
      previousId: 124,
      nextId: 126,
      authorId: 1
    },
    {
      id: 126,
      title: 'Daf 21',
      tags: [ 1, 5, 3 ],
      date: '2020-03-27T00:00:00',
      duration: '42:14',
      previousId: 125,
      nextId: 127,
      authorId: 1
    },
    {
      id: 127,
      title: 'Daf 22',
      tags: [ 1, 5, 3 ],
      date: '2020-03-28T00:00:00',
      duration: '40:08',
      previousId: 126,
      nextId: 128,
      authorId: 1
    },
    {
      id: 128,
      title: 'Daf 23',
      tags: [ 1, 5, 3 ],
      date: '2020-03-29T00:00:00',
      duration: '37:30',
      previousId: 127,
      nextId: 129,
      authorId: 1
    },
    {
      id: 129,
      title: 'Daf 24',
      tags: [ 1, 5, 3 ],
      date: '2020-03-30T00:00:00',
      duration: '41:35',
      previousId: 128,
      nextId: 130,
      authorId: 1
    },
    {
      id: 130,
      title: 'Daf 25',
      tags: [ 1, 5, 3 ],
      date: '2020-03-31T00:00:00',
      duration: '35:12',
      previousId: 129,
      nextId: 131,
      authorId: 1
    },
    {
      id: 131,
      title: 'Daf 26',
      tags: [ 1, 5, 3 ],
      date: '2020-04-01T00:00:00',
      duration: '34:36',
      previousId: 130,
      nextId: 132,
      authorId: 1
    },
    {
      id: 132,
      title: 'Daf 27',
      tags: [ 1, 5, 3 ],
      date: '2020-04-02T00:00:00',
      duration: '42:05',
      previousId: 131,
      nextId: 140,
      authorId: 1
    },
    {
      id: 133,
      title: 'Daf 28',
      tags: [ 1, 5, 3 ],
      date: '2020-04-03T00:00:00',
      duration: '46:49',
      previousId: 132,
      nextId: 134,
      authorId: 1
    },
    {
      id: 134,
      title: 'Daf 29',
      tags: [ 1, 5, 3 ],
      date: '2020-04-04T00:00:00',
      duration: '46:03',
      previousId: 133,
      nextId: 135,
      authorId: 1
    },
    {
      id: 135,
      title: 'Daf 30',
      tags: [ 1, 5, 3 ],
      date: '2020-04-05T00:00:00',
      duration: '51:24',
      previousId: 134,
      nextId: 136,
      authorId: 1
    },
    {
      id: 136,
      title: 'Daf 31',
      tags: [ 1, 5, 3 ],
      date: '2020-04-06T00:00:00',
      duration: '50:45',
      previousId: 135,
      nextId: 137,
      authorId: 1
    },
    {
      id: 137,
      title: 'Daf 32',
      tags: [ 1, 5, 3 ],
      date: '2020-04-07T00:00:00',
      duration: '42:10',
      previousId: 136,
      nextId: 138,
      authorId: 1
    },
    {
      id: 138,
      title: 'Daf 33',
      tags: [ 1, 5, 3 ],
      date: '2020-04-08T00:00:00',
      duration: '50:48',
      previousId: 137,
      nextId: 139,
      authorId: 1
    },
    {
      id: 139,
      title: 'Daf 34',
      tags: [ 1, 5, 3 ],
      date: '2020-04-09T00:00:00',
      duration: '20:09',
      previousId: 138,
      nextId: 140,
      authorId: 1
    },
    {
      id: 140,
      title: 'Daf 35',
      tags: [ 1, 5, 3 ],
      date: '2020-04-10T00:00:00',
      duration: '17:58',
      previousId: 139,
      nextId: 141,
      authorId: 1
    },
    {
      id: 141,
      title: 'Daf 36',
      tags: [ 1, 5, 3 ],
      date: '2020-04-11T00:00:00',
      duration: '19:17',
      previousId: 140,
      nextId: 142,
      authorId: 1
    },
    {
      id: 142,
      title: 'Daf 37',
      tags: [ 1, 5, 3 ],
      date: '2020-04-12T00:00:00',
      duration: '46:28',
      previousId: 141,
      nextId: 143,
      authorId: 1
    },
    {
      id: 143,
      title: 'Daf 38',
      tags: [ 1, 5, 3 ],
      date: '2020-04-13T00:00:00',
      duration: '44:35',
      previousId: 142,
      nextId: 144,
      authorId: 1
    },
    {
      id: 144,
      title: 'Daf 39',
      tags: [ 1, 5, 3 ],
      date: '2020-04-14T00:00:00',
      duration: '39:45',
      previousId: 143,
      nextId: 145,
      authorId: 1
    },
    {
      id: 145,
      title: 'Daf 40',
      tags: [ 1, 5, 3 ],
      date: '2020-04-15T00:00:00',
      duration: '27:52',
      previousId: 144,
      nextId: 146,
      authorId: 1
    },
    {
      id: 146,
      title: 'Daf 41',
      tags: [ 1, 5, 3 ],
      date: '2020-04-16T00:00:00',
      duration: '18:55',
      previousId: 145,
      nextId: 147,
      authorId: 1
    },
    {
      id: 147,
      title: 'Daf 42',
      tags: [ 1, 5, 3 ],
      date: '2020-04-17T00:00:00',
      duration: '01:09:49',
      previousId: 146,
      nextId: 148,
      authorId: 1
    },
    {
      id: 148,
      title: 'Daf 43',
      tags: [ 1, 5, 3 ],
      date: '2020-04-18T00:00:00',
      duration: '46:48',
      previousId: 147,
      nextId: 149,
      authorId: 1
    },
    {
      id: 149,
      title: 'Daf 44',
      tags: [ 1, 5, 3 ],
      date: '2020-04-19T00:00:00',
      duration: '40:01',
      previousId: 148,
      nextId: 150,
      authorId: 1
    },
    {
      id: 150,
      title: 'Daf 45',
      tags: [ 1, 5, 3 ],
      date: '2020-04-20T00:00:00',
      duration: '45:02',
      previousId: 149,
      nextId: 151,
      authorId: 1
    },
    {
      id: 151,
      title: 'Daf 46',
      tags: [ 1, 5, 3 ],
      date: '2020-04-21T00:00:00',
      duration: '38:43',
      previousId: 150,
      nextId: 152,
      authorId: 1
    },
    {
      id: 152,
      title: 'Daf 47',
      tags: [ 1, 5, 3 ],
      date: '2020-04-22T00:00:00',
      duration: '46:12',
      previousId: 151,
      nextId: 153,
      authorId: 1
    },
    {
      id: 153,
      title: 'Daf 48',
      tags: [ 1, 5, 3 ],
      date: '2020-04-23T00:00:00',
      duration: '42:55',
      previousId: 152,
      nextId: 154,
      authorId: 1
    },
    {
      id: 154,
      title: 'Daf 49',
      tags: [ 1, 5, 3 ],
      date: '2020-04-24T00:00:00',
      duration: '49:12',
      previousId: 153,
      nextId: 155,
      authorId: 1
    },
    {
      id: 155,
      title: 'Daf 50',
      tags: [ 1, 5, 3 ],
      date: '2020-04-25T00:00:00',
      duration: '42:34',
      previousId: 154,
      nextId: 156,
      authorId: 1
    },
    {
      id: 156,
      title: 'Daf 51',
      tags: [ 1, 5, 3 ],
      date: '2020-04-26T00:00:00',
      duration: '40:40',
      previousId: 155,
      nextId: 157,
      authorId: 1
    },
    {
      id: 157,
      title: 'Daf 52',
      tags: [ 1, 5, 3 ],
      date: '2020-04-27T00:00:00',
      duration: '57:40',
      previousId: 156,
      nextId: 158,
      authorId: 1
    },
    {
      id: 158,
      title: 'Daf 53',
      tags: [ 1, 5, 3 ],
      date: '2020-04-28T00:00:00',
      duration: '01:03:07',
      previousId: 157,
      nextId: 159,
      authorId: 1
    },
    {
      id: 159,
      title: 'Daf 54',
      tags: [ 1, 5, 3 ],
      date: '2020-04-29T00:00:00',
      duration: '53:59',
      previousId: 158,
      nextId: 160,
      authorId: 1
    },
    {
      id: 160,
      title: 'Daf 55',
      tags: [ 1, 5, 3 ],
      date: '2020-04-30T00:00:00',
      duration: '48:25',
      previousId: 159,
      nextId: 161,
      authorId: 1
    },
    {
      id: 161,
      title: 'Daf 56',
      tags: [ 1, 5, 3 ],
      date: '2020-05-01T00:00:00',
      duration: '42:41',
      previousId: 160,
      nextId: 162,
      authorId: 1
    },
    {
      id: 162,
      title: 'Daf 57',
      tags: [ 1, 5, 3 ],
      date: '2020-05-02T00:00:00',
      duration: '46:30',
      previousId: 161,
      nextId: 163,
      authorId: 1
    },
    {
      id: 163,
      title: 'Daf 58',
      tags: [ 1, 5, 3 ],
      date: '2020-05-03T00:00:00',
      duration: '40:44',
      previousId: 162,
      nextId: 164,
      authorId: 1
    },
    {
      id: 164,
      title: 'Daf 59',
      tags: [ 1, 5, 3 ],
      date: '2020-05-04T00:00:00',
      duration: '50:01',
      previousId: 163,
      nextId: 165,
      authorId: 1
    },
    {
      id: 165,
      title: 'Daf 60',
      tags: [ 1, 5, 3 ],
      date: '2020-05-05T00:00:00',
      duration: '47:54',
      previousId: 164,
      nextId: 166,
      authorId: 1
    },
    {
      id: 166,
      title: 'Daf 61',
      tags: [ 1, 5, 3 ],
      date: '2020-05-06T00:00:00',
      duration: '48:52',
      previousId: 165,
      nextId: 167,
      authorId: 1
    },
    {
      id: 167,
      title: 'Daf 62',
      tags: [ 1, 5, 3 ],
      date: '2020-05-07T00:00:00',
      duration: '56:57',
      previousId: 166,
      nextId: 168,
      authorId: 1
    },
    {
      id: 168,
      title: 'Daf 63',
      tags: [ 1, 5, 3 ],
      date: '2020-05-08T00:00:00',
      duration: '47:12',
      previousId: 167,
      nextId: 169,
      authorId: 1
    },
    {
      id: 169,
      title: 'Daf 64',
      tags: [ 1, 5, 3 ],
      date: '2020-05-09T00:00:00',
      duration: '41:30',
      previousId: 168,
      nextId: 170,
      authorId: 1
    },
    {
      id: 170,
      title: 'Daf 65',
      tags: [ 1, 5, 3 ],
      date: '2020-05-10T00:00:00',
      duration: '45:17',
      previousId: 169,
      nextId: 174,
      authorId: 1
    },
    {
      id: 171,
      title: 'Daf 66',
      tags: [ 1, 5, 3 ],
      date: '2020-05-11T00:00:00',
      duration: '01:01:09',
      previousId: 170,
      nextId: 172,
      authorId: 1
    },
    {
      id: 172,
      title: 'Daf 67',
      tags: [ 1, 5, 3 ],
      date: '2020-05-12T00:00:00',
      duration: '35:08',
      previousId: 171,
      nextId: 173,
      authorId: 1
    },
    {
      id: 173,
      title: 'Daf 68',
      tags: [ 1, 5, 3 ],
      date: '2020-05-13T00:00:00',
      duration: '57:13',
      previousId: 172,
      nextId: 174,
      authorId: 1
    },
    {
      id: 174,
      title: 'Daf 69',
      tags: [ 1, 5, 3 ],
      date: '2020-05-14T00:00:00',
      duration: '58:46',
      previousId: 173,
      nextId: 175,
      authorId: 1
    },
    {
      id: 175,
      title: 'Daf 70',
      tags: [ 1, 5, 3 ],
      date: '2020-05-15T00:00:00',
      duration: '56:43',
      previousId: 174,
      nextId: 176,
      authorId: 1
    },
    {
      id: 176,
      title: 'Daf 71',
      tags: [ 1, 5, 3 ],
      date: '2020-05-16T00:00:00',
      duration: '01:00:03',
      previousId: 175,
      nextId: 177,
      authorId: 1
    },
    {
      id: 177,
      title: 'Daf 72',
      tags: [ 1, 5, 3 ],
      date: '2020-05-17T00:00:00',
      duration: '01:00:55',
      previousId: 176,
      nextId: 178,
      authorId: 1
    },
    {
      id: 178,
      title: 'Daf 73',
      tags: [ 1, 5, 3 ],
      date: '2020-05-18T00:00:00',
      duration: '01:03:15',
      previousId: 177,
      nextId: 179,
      authorId: 1
    },
    {
      id: 179,
      title: 'Daf 74',
      tags: [ 1, 5, 3 ],
      date: '2020-05-19T00:00:00',
      duration: '50:55',
      previousId: 178,
      nextId: 180,
      authorId: 1
    },
    {
      id: 180,
      title: 'Daf 75',
      tags: [ 1, 5, 3 ],
      date: '2020-05-20T00:00:00',
      duration: '50:03',
      previousId: 179,
      nextId: 181,
      authorId: 1
    },
    {
      id: 181,
      title: 'Daf 76',
      tags: [ 1, 5, 3 ],
      date: '2020-05-21T00:00:00',
      duration: '47:11',
      previousId: 180,
      nextId: 182,
      authorId: 1
    },
    {
      id: 182,
      title: 'Daf 77',
      tags: [ 1, 5, 3 ],
      date: '2020-05-22T00:00:00',
      duration: '44:45',
      previousId: 181,
      nextId: 185,
      authorId: 1
    },
    {
      id: 183,
      title: 'Daf 78',
      tags: [ 1, 5, 3 ],
      date: '2020-05-23T00:00:00',
      duration: '01:02:27',
      previousId: 182,
      nextId: 184,
      authorId: 1
    },
    {
      id: 184,
      title: 'Daf 79',
      tags: [ 1, 5, 3 ],
      date: '2020-05-24T00:00:00',
      duration: '41:55',
      previousId: 183,
      nextId: 185,
      authorId: 1
    },
    {
      id: 185,
      title: 'Daf 80',
      tags: [ 1, 5, 3 ],
      date: '2020-05-25T00:00:00',
      duration: '53:11',
      previousId: 184,
      nextId: 186,
      authorId: 1
    },
    {
      id: 186,
      title: 'Daf 81',
      tags: [ 1, 5, 3 ],
      date: '2020-05-26T00:00:00',
      duration: '55:49',
      previousId: 185,
      nextId: 187,
      authorId: 1
    },
    {
      id: 187,
      title: 'Daf 82',
      tags: [ 1, 5, 3 ],
      date: '2020-05-27T00:00:00',
      duration: '48:29',
      previousId: 186,
      nextId: 188,
      authorId: 1
    },
    {
      id: 188,
      title: 'Daf 83',
      tags: [ 1, 5, 3 ],
      date: '2020-05-28T00:00:00',
      duration: '58:46',
      previousId: 187,
      nextId: 189,
      authorId: 1
    },
    {
      id: 189,
      title: 'Daf 84',
      tags: [ 1, 5, 3 ],
      date: '2020-05-29T00:00:00',
      duration: '24:23',
      previousId: 188,
      nextId: 190,
      authorId: 1
    },
    {
      id: 190,
      title: 'Daf 85',
      tags: [ 1, 5, 3 ],
      date: '2020-05-30T00:00:00',
      duration: '18:31',
      previousId: 189,
      nextId: 191,
      authorId: 1
    },
    {
      id: 191,
      title: 'Daf 86',
      tags: [ 1, 5, 3 ],
      date: '2020-05-31T00:00:00',
      duration: '54:26',
      previousId: 190,
      nextId: 192,
      authorId: 1
    },
    {
      id: 192,
      title: 'Daf 87',
      tags: [ 1, 5, 3 ],
      date: '2020-06-01T00:00:00',
      duration: '53:33',
      previousId: 191,
      nextId: 193,
      authorId: 1
    },
    {
      id: 193,
      title: 'Daf 88',
      tags: [ 1, 5, 3 ],
      date: '2020-06-02T00:00:00',
      duration: '51:42',
      previousId: 192,
      nextId: 194,
      authorId: 1
    },
    {
      id: 194,
      title: 'Daf 89',
      tags: [ 1, 5, 3 ],
      date: '2020-06-03T00:00:00',
      duration: '36:50',
      previousId: 193,
      nextId: 195,
      authorId: 1
    },
    {
      id: 195,
      title: 'Daf 90',
      tags: [ 1, 5, 3 ],
      date: '2020-06-04T00:00:00',
      duration: '47:00',
      previousId: 194,
      nextId: 196,
      authorId: 1
    },
    {
      id: 196,
      title: 'Daf 91',
      tags: [ 1, 5, 3 ],
      date: '2020-06-05T00:00:00',
      duration: '58:27',
      previousId: 195,
      nextId: 197,
      authorId: 1
    },
    {
      id: 197,
      title: 'Daf 92',
      tags: [ 1, 5, 3 ],
      date: '2020-06-06T00:00:00',
      duration: '56:19',
      previousId: 196,
      nextId: 198,
      authorId: 1
    },
    {
      id: 198,
      title: 'Daf 93',
      tags: [ 1, 5, 3 ],
      date: '2020-06-07T00:00:00',
      duration: '41:18',
      previousId: 197,
      nextId: 199,
      authorId: 1
    },
    {
      id: 199,
      title: 'Daf 94',
      tags: [ 1, 5, 3 ],
      date: '2020-06-08T00:00:00',
      duration: '50:08',
      previousId: 198,
      nextId: 200,
      authorId: 1
    },
    {
      id: 200,
      title: 'Daf 95',
      tags: [ 1, 5, 3 ],
      date: '2020-06-09T00:00:00',
      duration: '43:19',
      previousId: 199,
      nextId: 201,
      authorId: 1
    },
    {
      id: 201,
      title: 'Daf 96',
      tags: [ 1, 5, 3 ],
      date: '2020-06-10T00:00:00',
      duration: '53:11',
      previousId: 200,
      nextId: 202,
      authorId: 1
    },
    {
      id: 202,
      title: 'Daf 97',
      tags: [ 1, 5, 3 ],
      date: '2020-06-11T00:00:00',
      duration: '58:02',
      previousId: 201,
      nextId: 203,
      authorId: 1
    },
    {
      id: 203,
      title: 'Daf 98',
      tags: [ 1, 5, 3 ],
      date: '2020-06-12T00:00:00',
      duration: '01:01:45',
      previousId: 202,
      nextId: 204,
      authorId: 1
    },
    {
      id: 204,
      title: 'Daf 99',
      tags: [ 1, 5, 3 ],
      date: '2020-06-13T00:00:00',
      duration: '48:03',
      previousId: 203,
      nextId: 205,
      authorId: 1
    },
    {
      id: 205,
      title: 'Daf 100',
      tags: [ 1, 5, 3 ],
      date: '2020-06-14T00:00:00',
      duration: '55:18',
      previousId: 204,
      nextId: 206,
      authorId: 1
    },
    {
      id: 206,
      title: 'Daf 101',
      tags: [ 1, 5, 3 ],
      date: '2020-06-15T00:00:00',
      duration: '47:05',
      previousId: 205,
      nextId: 207,
      authorId: 1
    },
    {
      id: 207,
      title: 'Daf 102',
      tags: [ 1, 5, 3 ],
      date: '2020-06-16T00:00:00',
      duration: '55:58',
      previousId: 206,
      nextId: 208,
      authorId: 1
    },
    {
      id: 208,
      title: 'Daf 103',
      tags: [ 1, 5, 3 ],
      date: '2020-06-17T00:00:00',
      duration: '56:20',
      previousId: 207,
      nextId: 209,
      authorId: 1
    },
    {
      id: 209,
      title: 'Daf 104',
      tags: [ 1, 5, 3 ],
      date: '2020-06-18T00:00:00',
      duration: '51:00',
      previousId: 208,
      nextId: 210,
      authorId: 1
    },
    {
      id: 210,
      title: 'Daf 105',
      tags: [ 1, 5, 3 ],
      date: '2020-06-19T00:00:00',
      duration: '54:44',
      previousId: 209,
      nextId: 211,
      authorId: 1
    },
    {
      id: 211,
      title: 'Daf 106',
      tags: [ 1, 5, 3 ],
      date: '2020-06-20T00:00:00',
      duration: '40:19',
      previousId: 210,
      nextId: 212,
      authorId: 1
    },
    {
      id: 212,
      title: 'Daf 107',
      tags: [ 1, 5, 3 ],
      date: '2020-06-21T00:00:00',
      duration: '54:46',
      previousId: 211,
      nextId: 213,
      authorId: 1
    },
    {
      id: 213,
      title: 'Daf 108',
      tags: [ 1, 5, 3 ],
      date: '2020-06-22T00:00:00',
      duration: '52:51',
      previousId: 212,
      nextId: 214,
      authorId: 1
    },
    {
      id: 214,
      title: 'Daf 109',
      tags: [ 1, 5, 3 ],
      date: '2020-06-23T00:00:00',
      duration: '56:14',
      previousId: 213,
      nextId: 215,
      authorId: 1
    },
    {
      id: 215,
      title: 'Daf 110',
      tags: [ 1, 5, 3 ],
      date: '2020-06-24T00:00:00',
      duration: '46:22',
      previousId: 214,
      nextId: 216,
      authorId: 1
    },
    {
      id: 216,
      title: 'Daf 111',
      tags: [ 1, 5, 3 ],
      date: '2020-06-25T00:00:00',
      duration: '40:36',
      previousId: 215,
      nextId: 217,
      authorId: 1
    },
    {
      id: 217,
      title: 'Daf 112',
      tags: [ 1, 5, 3 ],
      date: '2020-06-26T00:00:00',
      duration: '49:14',
      previousId: 216,
      nextId: 218,
      authorId: 1
    },
    {
      id: 218,
      title: 'Daf 113',
      tags: [ 1, 5, 3 ],
      date: '2020-06-27T00:00:00',
      duration: '49:13',
      previousId: 217,
      nextId: 219,
      authorId: 1
    },
    {
      id: 219,
      title: 'Daf 114',
      tags: [ 1, 5, 3 ],
      date: '2020-06-28T00:00:00',
      duration: '53:55',
      previousId: 218,
      nextId: 220,
      authorId: 1
    },
    {
      id: 220,
      title: 'Daf 115',
      tags: [ 1, 5, 3 ],
      date: '2020-06-29T00:00:00',
      duration: '42:57',
      previousId: 219,
      nextId: 221,
      authorId: 1
    },
    {
      id: 221,
      title: 'Daf 116',
      tags: [ 1, 5, 3 ],
      date: '2020-06-30T00:00:00',
      duration: '54:07',
      previousId: 220,
      nextId: 222,
      authorId: 1
    },
    {
      id: 222,
      title: 'Daf 117',
      tags: [ 1, 5, 3 ],
      date: '2020-07-01T00:00:00',
      duration: '50:53',
      previousId: 221,
      nextId: 223,
      authorId: 1
    },
    {
      id: 223,
      title: 'Daf 118',
      tags: [ 1, 5, 3 ],
      date: '2020-07-02T00:00:00',
      duration: '44:51',
      previousId: 222,
      nextId: 224,
      authorId: 1
    },
    {
      id: 224,
      title: 'Daf 119',
      tags: [ 1, 5, 3 ],
      date: '2020-07-03T00:00:00',
      duration: '48:34',
      previousId: 223,
      nextId: 225,
      authorId: 1
    },
    {
      id: 225,
      title: 'Daf 120',
      tags: [ 1, 5, 3 ],
      date: '2020-07-04T00:00:00',
      duration: '29:01',
      previousId: 224,
      nextId: 226,
      authorId: 1
    },
    {
      id: 226,
      title: 'Daf 121',
      tags: [ 1, 5, 3 ],
      date: '2020-07-05T00:00:00',
      duration: '52:19',
      previousId: 225,
      nextId: 227,
      authorId: 1
    },
    {
      id: 227,
      title: 'Daf 122',
      tags: [ 1, 5, 3 ],
      date: '2020-07-06T00:00:00',
      duration: '51:02',
      previousId: 226,
      nextId: 228,
      authorId: 1
    },
    {
      id: 228,
      title: 'Daf 123',
      tags: [ 1, 5, 3 ],
      date: '2020-07-07T00:00:00',
      duration: '55:22',
      previousId: 227,
      nextId: 229,
      authorId: 1
    },
    {
      id: 229,
      title: 'Daf 124',
      tags: [ 1, 5, 3 ],
      date: '2020-07-08T00:00:00',
      duration: '50:17',
      previousId: 228,
      nextId: 230,
      authorId: 1
    },
    {
      id: 230,
      title: 'Daf 125',
      tags: [ 1, 5, 3 ],
      date: '2020-07-09T00:00:00',
      duration: '47:45',
      previousId: 229,
      nextId: 231,
      authorId: 1
    },
    {
      id: 231,
      title: 'Daf 126',
      tags: [ 1, 5, 3 ],
      date: '2020-07-10T00:00:00',
      duration: '34:48',
      previousId: 230,
      nextId: 232,
      authorId: 1
    },
    {
      id: 232,
      title: 'Daf 127',
      tags: [ 1, 5, 3 ],
      date: '2020-07-11T00:00:00',
      duration: '39:28',
      previousId: 231,
      nextId: 233,
      authorId: 1
    },
    {
      id: 233,
      title: 'Daf 128',
      tags: [ 1, 5, 3 ],
      date: '2020-07-12T00:00:00',
      duration: '39:02',
      previousId: 232,
      nextId: 234,
      authorId: 1
    },
    {
      id: 234,
      title: 'Daf 129',
      tags: [ 1, 5, 3 ],
      date: '2020-07-13T00:00:00',
      duration: '39:28',
      previousId: 233,
      nextId: 235,
      authorId: 1
    },
    {
      id: 235,
      title: 'Daf 130',
      tags: [ 1, 5, 3 ],
      date: '2020-07-14T00:00:00',
      duration: '53:36',
      previousId: 234,
      nextId: 236,
      authorId: 1
    },
    {
      id: 236,
      title: 'Daf 131',
      tags: [ 1, 5, 3 ],
      date: '2020-07-15T00:00:00',
      duration: '51:33',
      previousId: 235,
      nextId: 237,
      authorId: 1
    },
    {
      id: 237,
      title: 'Daf 132',
      tags: [ 1, 5, 3 ],
      date: '2020-07-16T00:00:00',
      duration: '48:03',
      previousId: 236,
      nextId: 238,
      authorId: 1
    },
    {
      id: 238,
      title: 'Daf 133',
      tags: [ 1, 5, 3 ],
      date: '2020-07-17T00:00:00',
      duration: '57:52',
      previousId: 237,
      nextId: 239,
      authorId: 1
    },
    {
      id: 239,
      title: 'Daf 134',
      tags: [ 1, 5, 3 ],
      date: '2020-07-18T00:00:00',
      duration: '43:18',
      previousId: 238,
      nextId: 240,
      authorId: 1
    },
    {
      id: 240,
      title: 'Daf 135',
      tags: [ 1, 5, 3 ],
      date: '2020-07-19T00:00:00',
      duration: '52:35',
      previousId: 239,
      nextId: 241,
      authorId: 1
    },
    {
      id: 241,
      title: 'Daf 136',
      tags: [ 1, 5, 3 ],
      date: '2020-07-20T00:00:00',
      duration: '36:50',
      previousId: 240,
      nextId: 242,
      authorId: 1
    },
    {
      id: 242,
      title: 'Daf 137',
      tags: [ 1, 5, 3 ],
      date: '2020-07-21T00:00:00',
      duration: '51:28',
      previousId: 241,
      nextId: 243,
      authorId: 1
    },
    {
      id: 243,
      title: 'Daf 138',
      tags: [ 1, 5, 3 ],
      date: '2020-07-22T00:00:00',
      duration: '45:06',
      previousId: 242,
      nextId: 244,
      authorId: 1
    },
    {
      id: 244,
      title: 'Daf 139',
      tags: [ 1, 5, 3 ],
      date: '2020-07-23T00:00:00',
      duration: '50:44',
      previousId: 243,
      nextId: 245,
      authorId: 1
    },
    {
      id: 245,
      title: 'Daf 140',
      tags: [ 1, 5, 3 ],
      date: '2020-07-24T00:00:00',
      duration: '53:37',
      previousId: 244,
      nextId: 246,
      authorId: 1
    },
    {
      id: 246,
      title: 'Daf 141',
      tags: [ 1, 5, 3 ],
      date: '2020-07-25T00:00:00',
      duration: '34:35',
      previousId: 245,
      nextId: 247,
      authorId: 1
    },
    {
      id: 247,
      title: 'Daf 142',
      tags: [ 1, 5, 3 ],
      date: '2020-07-26T00:00:00',
      duration: '51:16',
      previousId: 246,
      nextId: 248,
      authorId: 1
    },
    {
      id: 248,
      title: 'Daf 143',
      tags: [ 1, 5, 3 ],
      date: '2020-07-27T00:00:00',
      duration: '42:48',
      previousId: 247,
      nextId: 249,
      authorId: 1
    },
    {
      id: 249,
      title: 'Daf 144',
      tags: [ 1, 5, 3 ],
      date: '2020-07-28T00:00:00',
      duration: '52:15',
      previousId: 248,
      nextId: 250,
      authorId: 1
    },
    {
      id: 250,
      title: 'Daf 145',
      tags: [ 1, 5, 3 ],
      date: '2020-07-29T00:00:00',
      duration: '43:02',
      previousId: 249,
      nextId: 251,
      authorId: 1
    },
    {
      id: 251,
      title: 'Daf 146',
      tags: [ 1, 5, 3 ],
      date: '2020-07-30T00:00:00',
      duration: '37:28',
      previousId: 250,
      nextId: 252,
      authorId: 1
    },
    {
      id: 252,
      title: 'Daf 147',
      tags: [ 1, 5, 3 ],
      date: '2020-07-31T00:00:00',
      duration: '49:58',
      previousId: 251,
      nextId: 253,
      authorId: 1
    },
    {
      id: 253,
      title: 'Daf 148',
      tags: [ 1, 5, 3 ],
      date: '2020-08-01T00:00:00',
      duration: '27:28',
      previousId: 252,
      nextId: 254,
      authorId: 1
    },
    {
      id: 254,
      title: 'Daf 149',
      tags: [ 1, 5, 3 ],
      date: '2020-08-02T00:00:00',
      duration: '44:21',
      previousId: 253,
      nextId: 255,
      authorId: 1
    },
    {
      id: 255,
      title: 'Daf 150',
      tags: [ 1, 5, 3 ],
      date: '2020-08-03T00:00:00',
      duration: '34:44',
      previousId: 254,
      nextId: 256,
      authorId: 1
    },
    {
      id: 256,
      title: 'Daf 151',
      tags: [ 1, 5, 3 ],
      date: '2020-08-04T00:00:00',
      duration: '29:16',
      previousId: 255,
      nextId: 257,
      authorId: 1
    },
    {
      id: 257,
      title: 'Daf 152',
      tags: [ 1, 5, 3 ],
      date: '2020-08-05T00:00:00',
      duration: '23:42',
      previousId: 256,
      nextId: 258,
      authorId: 1
    },
    {
      id: 258,
      title: 'Daf 153',
      tags: [ 1, 5, 3 ],
      date: '2020-08-06T00:00:00',
      duration: '30:17',
      previousId: 257,
      nextId: 259,
      authorId: 1
    },
    {
      id: 259,
      title: 'Daf 154',
      tags: [ 1, 5, 3 ],
      date: '2020-08-07T00:00:00',
      duration: '29:34',
      previousId: 258,
      nextId: 260,
      authorId: 1
    },
    {
      id: 260,
      title: 'Daf 155',
      tags: [ 1, 5, 3 ],
      date: '2020-08-08T00:00:00',
      duration: '31:46',
      previousId: 259,
      nextId: 261,
      authorId: 1
    },
    {
      id: 261,
      title: 'Daf 156',
      tags: [ 1, 5, 3 ],
      date: '2020-08-09T00:00:00',
      duration: '25:46',
      previousId: 260,
      nextId: 262,
      authorId: 1
    },
    {
      id: 262,
      title: 'Daf 157',
      tags: [ 1, 5, 3 ],
      date: '2020-08-10T00:00:00',
      duration: '18:09',
      previousId: 261,
      nextId: 263,
      authorId: 1
    },
    {
      id: 263,
      title: 'Daf 2',
      tags: [ 1, 6, 3 ],
      date: '2020-08-11T00:00:00',
      duration: '40:47',
      previousId: 262,
      nextId: 264,
      authorId: 1
    },
    {
      id: 264,
      title: 'Daf 3',
      tags: [ 1, 6, 3 ],
      date: '2020-08-12T00:00:00',
      duration: '59:23',
      previousId: 263,
      nextId: 265,
      authorId: 1
    },
    {
      id: 265,
      title: 'Daf 4',
      tags: [ 1, 6, 3 ],
      date: '2020-08-13T00:00:00',
      duration: '50:21',
      previousId: 264,
      nextId: 266,
      authorId: 1
    },
    {
      id: 266,
      title: 'Daf 5',
      tags: [ 1, 6, 3 ],
      date: '2020-08-14T00:00:00',
      duration: '01:06:03',
      previousId: 265,
      nextId: 267,
      authorId: 1
    },
    {
      id: 267,
      title: 'Daf 6',
      tags: [ 1, 6, 3 ],
      date: '2020-08-15T00:00:00',
      duration: '36:51',
      previousId: 266,
      nextId: 268,
      authorId: 1
    },
    {
      id: 268,
      title: 'Daf 7',
      tags: [ 1, 6, 3 ],
      date: '2020-08-16T00:00:00',
      duration: '52:43',
      previousId: 267,
      nextId: 269,
      authorId: 1
    },
    {
      id: 269,
      title: 'Daf 8',
      tags: [ 1, 6, 3 ],
      date: '2020-08-17T00:00:00',
      duration: '56:44',
      previousId: 268,
      nextId: 270,
      authorId: 1
    },
    {
      id: 270,
      title: 'Daf 9',
      tags: [ 1, 6, 3 ],
      date: '2020-08-18T00:00:00',
      duration: '54:47',
      previousId: 269,
      nextId: 271,
      authorId: 1
    },
    {
      id: 271,
      title: 'Daf 10',
      tags: [ 1, 6, 3 ],
      date: '2020-08-19T00:00:00',
      duration: '53:04',
      previousId: 270,
      nextId: 272,
      authorId: 1
    },
    {
      id: 272,
      title: 'Daf 11',
      tags: [ 1, 6, 3 ],
      date: '2020-08-20T00:00:00',
      duration: '53:07',
      previousId: 271,
      nextId: 273,
      authorId: 1
    },
    {
      id: 273,
      title: 'Daf 12',
      tags: [ 1, 6, 3 ],
      date: '2020-08-21T00:00:00',
      duration: '48:42',
      previousId: 272,
      nextId: 274,
      authorId: 1
    },
    {
      id: 274,
      title: 'Daf 13',
      tags: [ 1, 6, 3 ],
      date: '2020-08-22T00:00:00',
      duration: '28:24',
      previousId: 273,
      nextId: 275,
      authorId: 1
    },
    {
      id: 275,
      title: 'Daf 14',
      tags: [ 1, 6, 3 ],
      date: '2020-08-23T00:00:00',
      duration: '55:48',
      previousId: 274,
      nextId: 276,
      authorId: 1
    },
    {
      id: 276,
      title: 'Daf 15',
      tags: [ 1, 6, 3 ],
      date: '2020-08-24T00:00:00',
      duration: '54:36',
      previousId: 275,
      nextId: null,
      authorId: 1
    }
  ],
  authors: [
    {
      id: 1,
      name: 'Rabbi Yosef Bromberg'
    }
  ]
};

export const AUDIO_MEDIA_COLLECTION = raw.shiurim
                                         .map(shiur => ({
                                           ...shiur,
                                           authorName: raw.authors.find(author => author.id === shiur.authorId)?.name
                                         }));

export const TAG_COLLECTION = raw.tags;
