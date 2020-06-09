import React, { useState } from 'react'
import { Paper, Button } from '@material-ui/core'

import './index.scss'
import Canada from './Canada'
import Global from './Global'
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
  const [canada, setCanada] = useState<boolean>(true)
  const [selections, toggleSelection] = useToggleArray(["confirmed"])

  return (
    <div className="Stats">
      <header>
        <Paper className="toggle" elevation={3}>
          <Button 
            color="primary" 
            variant={canada ? 'contained' : 'outlined'}
            onClick={() => setCanada(true)}
          >Canada</Button>
          <Button 
            color="primary" 
            variant={canada ? 'outlined' : 'contained'}
            onClick={() => setCanada(false)}
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
      {canada ? <Canada /> :  <Global />}
    </div>
  )
}