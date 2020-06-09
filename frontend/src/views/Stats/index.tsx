import React from 'react'
import { Paper } from '@material-ui/core'

import './index.scss'
import Canada from './Canada'

export default () => {
  return (
    <div className="Stats">
      <header>
        <div className="A">A</div>
        <div className="B">B</div>
      </header>
      <Canada />
    </div>
  )
}