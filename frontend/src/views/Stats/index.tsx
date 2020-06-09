import React, { useState } from 'react'
import { Paper, Button } from '@material-ui/core'

import './index.scss'
import Canada from './Canada'
import useToggleArray from '../../hooks/useToggleArray'

const selectionsArray = [
  {
    title: "Confirmed",
    value: "confirmed"
  },
  {
    title: "Deaths",
    value: "deaths"
  },
  {
    title: "Recovered",
    value: "recovered"
  }
]

export default () => {
  const [national, setNational] = useState<boolean>(true)
  const [selections, toggleSelection] = useToggleArray(["confirmed"])

  return (
    <div className="Stats">
      <header>
        <Paper className="toggle" elevation={3}>
          <Button 
            color="primary" 
            variant={national ? 'contained' : 'outlined'}
            onClick={() => setNational(true)}
          >Canada</Button>
          <Button 
            color="primary" 
            variant={national ? 'outlined' : 'contained'}
            onClick={() => setNational(false)}
          >Global</Button>
        </Paper>
        <Paper className="select" elevation={3}>
          {selectionsArray.map(i => <Button 
              key={i.value}
              color="primary" 
              variant={selections.includes(i.value) ? 'contained' : 'outlined'}
              onClick={() => toggleSelection(i.value)}
            >
              {i.title}
            </Button>
          )}
        </Paper>
      </header>
      {React.useMemo(() => <Canada />, [])}
    </div>
  )
}