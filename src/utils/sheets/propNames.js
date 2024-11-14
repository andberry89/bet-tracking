const propNames = sheetId => {
  const mlb = [{ tb: 'Total Bases' }, { hr: 'Homeruns' }, { strikeouts: 'Strikeouts' }, { hrr: 'Hits + Runs + RBIs' }]
  const nfl = [{ td: 'Touchdowns' }, { pass: 'Passing Yards' }, { rush: 'Rushing Yards' }, { rec: 'Receiving Yards' }]
  const nba = [{ pts: 'Points' }, { ast: 'Assists' }, { reb: 'Rebounds' }, { tpm: '3-Points Made' }]
  const nhl = [
    { sog: 'Shots on Goal' },
    { pts: 'Points' },
    { goals: 'Goals' },
    { saves: 'Saves' },
    { ast: 'Assists' },
    { ppp: 'Power Play Points' },
  ]
  const s5 = [{ s5: 'Starting 5' }]

  switch (sheetId) {
    case '660db1bcf994906905e1ce75':
      return mlb
    case '660db1bcf994906905e1ce76':
      return nfl
    case '660db1bcf994906905e1ce77':
      return nba
    case '660db1bcf994906905e1ce78':
      return nba
    case '66f1c78b3ed92cc9220749e7':
      return nhl
    case '660db1bcf994906905e1ce79':
      return s5
  }
}

// TODO: STARTING 5 NEEDS DIFFERENT LOGIC
// todo: possibly a different mongo model

export default propNames
