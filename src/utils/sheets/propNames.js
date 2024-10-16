const propNames = sheetId => {
  const mlb = [{ tb: 'Total Bases' }, { hr: 'Homeruns' }, { strikeouts: 'Strikeouts' }, { hrr: 'Hits + Runs + RBIs' }]
  const nfl = [{ td: 'Touchdowns' }, { pass: 'Passing Yards' }, { rush: 'Rushing Yards' }, { rec: 'Receiving Yards' }]
  const nba = [{ pts: 'Points' }, { ast: 'Assists' }, { reb: 'Rebounds' }, { tpm: '3-Points Made' }]
  const nhl = [{ sog: 'Shots on Goal' }, { pts: 'Points' }, { goals: 'Goals' }, { saves: 'Saves' }, { ast: 'Assists' }]

  switch (sheetId) {
    case '660db1bcf994906905e1ce75':
      return mlb
    case '660db1bcf994906905e1ce76':
      return nfl
    case '660db1bcf994906905e1ce77':
      return nba
    case '66f1c78b3ed92cc9220749e7':
      return nhl
  }
}

export default propNames
