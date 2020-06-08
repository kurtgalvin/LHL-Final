import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, YAxis, Tooltip, Brush, Line } from 'recharts';
import { ButtonGroup, Button, Tooltip as MaterialTooltip } from '@material-ui/core'

import './Stats.scss'
import canadaData from '../data/canada.json'

const provincesCode = {
  "Alberta": "AB",
  "British Columbia": "BC",
  "Manitoba": "MB",
  "New Brunswick": "NB",
  "Newfoundland and Labrador": "NL",
  "Nova Scotia": "NS",
  "Northwest Territories": "NT",
  "Ontario": "ON",
  "Prince Edward Island": "PE",
  "Quebec": "QC",
  "Saskatchewan": "SK",
  "Yukon": "YT"
}

interface IProps {

}

const randomColour = () => {
  const random = () => Math.floor(Math.random() * 255)
  return `rgb(${random()}, ${random()}, ${random()})`
}

const StatsView = ({}: IProps) => {
  const [provinces, setProvinces] = useState<string[]>(["Alberta", "British Columbia",  "Ontario", "Quebec"])
  const [lines, setLines] = useState<React.ReactElement[]>([])

  useEffect(() => {
    setLines(provinces.map((p) => {
      return <Line type="monotone" dataKey={`${(provincesCode as any)[p]}_confirmed`} stroke={randomColour()} dot={false} strokeWidth={3} />
    }))
  }, [provinces])

  return (
    <div className="Stats">
      <ButtonGroup color="primary" className="ButtonGroup">
        {Object.keys(provincesCode).map(p => {
          return (
            <MaterialTooltip title={p}>
              <Button 
                onClick={() => setProvinces(pArr => pArr.includes(p) ? pArr.filter(i => i !== p) : [...pArr, p])} 
                variant={provinces.includes(p) ? 'contained' : 'outlined'}
              >
                {(provincesCode as any)[p]}
              </Button>
            </MaterialTooltip>
          )
        })}
      </ButtonGroup>

      <div className="Chart">
        {/* <h1>Provinces</h1> */}
        <ResponsiveContainer width="100%" height={300} >
          <LineChart data={canadaData}>
            {/* <YAxis/> */}
            <Tooltip/>
            {lines}
            <Brush dataKey="date" startIndex={50}>
              <LineChart>
                {lines.map(line => React.cloneElement(line, {stroke: "rgb(82, 189, 242)"}))}
              </LineChart>
            </Brush>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatsView