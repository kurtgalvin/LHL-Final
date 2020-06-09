import React from 'react'
import { Button, Tooltip, LinearProgress } from '@material-ui/core'

interface IProps {
  title: string
  percent: number
  onClick: () => void
  active: boolean,
  children?: React.ReactNode
}

export default ({ title, percent, onClick, active, children }: IProps) => {
  return (
    <Tooltip title={title}>
      <Button color="primary" onClick={onClick} variant={active ? 'contained' : 'text'}>
        {children}<br />
        {active && <LinearProgress className="Progress" color="secondary" variant="determinate" value={percent} />}
      </Button>
    </Tooltip>
  )
}