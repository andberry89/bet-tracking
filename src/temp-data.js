export const contributors = [
  {
    id: 'c0001',
    name: 'Parlay Science',
    imageUrl: '/images/logo-ps.jpg',
    sports: ['NBA', 'MLB', 'NFL'],
  },
  {
    id: 'c0002',
    name: 'Money Mandrell',
    imageUrl: '/images/logo-mm.jpg',
    sports: ['NBA', 'MLB', 'NFL'],
  },
  {
    id: 'c0003',
    name: 'Props Kitchen',
    imageUrl: '/images/logo-pk.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0004',
    name: 'Pick with 456',
    imageUrl: '/images/logo-456.jpg',
    sports: ['Soccer', 'NFL'],
  },
  {
    id: 'c0005',
    name: 'Ahaan',
    imageUrl: '/images/logo-ahaan.jpg',
    sports: ['NFL', 'MLB', 'NBA'],
  },
  {
    id: 'c0006',
    name: 'Chalk Exchange',
    imageUrl: '/images/logo-ce.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0007',
    name: 'Exoline',
    imageUrl: '/images/logo-exoline.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0008',
    name: 'Gretzkys Betzkys',
    imageUrl: '/images/logo-gb.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0009',
    name: 'JBookie',
    imageUrl: '/images/logo-jbookie.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0010',
    name: 'The Lusor',
    imageUrl: '/images/logo-lusor.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0011',
    name: 'Stoned Betting',
    imageUrl: '/images/logo-sb.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0012',
    name: 'Young Simba',
    imageUrl: '/images/logo-simba.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0013',
    name: 'Slime',
    imageUrl: '/images/logo-slime.png',
    sports: ['NHL', 'MLB', 'NFL'],
  },
  {
    id: 'c0014',
    name: 'Yoyo',
    imageUrl: '/images/logo-yoyo.jpg',
    sports: ['NHL', 'MLB', 'NFL'],
  },
]

export const sheets = [
  {
    id: 's0001',
    name: 'MLB Sheets',
    imageUrl: '/images/mlb-sheets.jpg',
  },
  {
    id: 's0002',
    name: 'NFL Sheets',
    imageUrl: '/images/nfl-sheets.jpg',
  },
  {
    id: 's0003',
    name: 'NBA Sheets',
    imageUrl: '/images/nba-sheets.jpg',
  },
  {
    id: 's0004',
    name: 'NBA All-in-One Sheets',
    imageUrl: '/images/all-in-one.jpg',
  },
  {
    id: 's0005',
    name: 'NBA Starting 5',
    imageUrl: '/images/starting-5.jpg',
  },
]

export const bets = [
  {
    id: 'b0001',
    contributor_id: 'c0001',
    date: '2024/01/01',
    risk: '0.25',
    odds: '1025',
    payout: '2.56',
    won: true,
    sports: ['NBA'],
    future: false,
    book: 'DraftKings',
    type: 'Parlay',
    legs: ['Lebron James o6.5 Assists', 'Josh Hart o8.5 Rebounds', 'Naz Reid 15+ Points'],
  },
  {
    id: 'b0002',
    contributor_id: 'c0003',
    date: '2024/01/01',
    risk: '0.1',
    odds: '1700',
    payout: '1.7',
    won: false,
    sports: ['MLB'],
    future: true,
    book: 'FanDuel',
    type: 'Straight',
    legs: ['Lance Lynn o5.5 Strikeouts'],
  },
  {
    id: 'b0003',
    contributor_id: 'c0010',
    date: '2024/01/02',
    risk: '1.1',
    odds: '-110',
    payout: '1',
    won: false,
    sports: ['NHL'],
    future: false,
    book: 'Caesars',
    type: 'Straight',
    legs: ['Dylan Larkin o3.5 SOG'],
  },
]
